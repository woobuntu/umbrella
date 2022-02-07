import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  DeleteObjectsCommand,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { AwsConfig } from 'src/types/config';
import { FileUpload } from 'graphql-upload';
import { Prisma } from '@prisma/client';

@Injectable()
export class S3Service {
  s3Client: S3Client;
  bucket: string;
  region: string;

  constructor(private configService: ConfigService) {
    const { region, bucket } = this.configService.get<AwsConfig>('aws');

    this.s3Client = new S3Client({
      region,
    });

    this.bucket = bucket;
    this.region = region;
  }

  async uploadFiles(params: {
    KeyPrefix: string;
    files: FileUpload[];
  }): Promise<Prisma.FileCreateManyInput[]> {
    const { KeyPrefix, files } = params;

    function asyncReadStream(file: FileUpload) {
      const { createReadStream, filename, mimetype, encoding } = file;
      const stream = createReadStream();

      return new Promise((resolve, reject) => {
        const chunks = [];

        stream.on('readable', function () {
          let chunk: Buffer;

          while (null !== (chunk = stream.read())) {
            chunks.push(chunk);
          }
        });

        stream.on('end', async () => {
          const content = Buffer.concat(chunks);
          const fileUrl = await this.uploadFile({
            Key: `${KeyPrefix}/${filename}`,
            Body: content,
            ContentType: mimetype,
          });
          resolve({ name: filename, path: fileUrl, type: mimetype });
        });

        stream.on('error', (error) => reject(error));
      });
    }

    const uploadedFiles = [];
    for (const file of files) {
      const uploadedFile = await asyncReadStream.call(this, file);
      uploadedFiles.push(uploadedFile);
    }
    return uploadedFiles;
  }

  async uploadFile(bucketParams: {
    Key: string;
    Body: Buffer | string;
    ContentType: string;
  }) {
    await this.s3Client.send(
      new PutObjectCommand({
        ...bucketParams,
        Bucket: this.bucket,
        ACL: 'public-read',
      }),
    );
    // 아 근데 이미지는 encode하기 전에도 문제없이 잘 나오긴 하던데
    const encodedKey = bucketParams.Key.split('/')
      .map((component) => encodeURIComponent(component))
      .join('/');
    return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${encodedKey}`;
  }

  async deleteFile(Key: string) {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Key,
        Bucket: this.bucket,
      }),
    );
  }

  async deleteFiles(fileKeys: string[]) {
    for (const Key of fileKeys) {
      await this.deleteFile(Key);
    }
    // if (!Objects.length) return;
    // await this.s3Client.send(
    //   new DeleteObjectsCommand({
    //     Bucket: this.bucket,
    //     Delete: {
    //       Objects,
    //     },
    //   }),
    // );
  }
}
