import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { AwsConfig } from 'src/types/config';

@Injectable()
export class S3Service {
  s3Client: S3Client;
  bucket: string;

  constructor(private configService: ConfigService) {
    const { region, bucket } = this.configService.get<AwsConfig>('aws');

    this.s3Client = new S3Client({
      region,
    });

    this.bucket = bucket;
  }

  async uploadFile(bucketParams: { Key: string; Body: string }) {
    const data = await this.s3Client.send(
      new PutObjectCommand({
        ...bucketParams,
        Bucket: this.bucket,
      }),
    );

    console.log(data);
    return data;
  }
}
