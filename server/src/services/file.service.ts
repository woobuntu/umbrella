import { Prisma, File } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { PrismaService } from './prisma.service';
import { S3Service } from './s3.service';

@Injectable()
export class FileService {
  constructor(private prisma: PrismaService, private s3Service: S3Service) {}

  async file(
    fileWhereUniqueInput: Prisma.FileWhereUniqueInput,
  ): Promise<File | null> {
    return this.prisma.file.findUnique({
      where: fileWhereUniqueInput,
    });
  }

  async createFiles(params: { KeyPrefix: string; files: FileUpload[] }) {
    const uploadedFiles = await this.s3Service.uploadFiles(params);
    const createFilesCommand = uploadedFiles.map((uploadedFile) =>
      this.prisma.file.create({
        data: uploadedFile,
      }),
    );
    return this.prisma.$transaction(createFilesCommand);
  }

  deleteFile(where: Prisma.FileWhereUniqueInput) {
    return this.prisma.file.delete({
      where,
    });
  }

  getKey(url: string) {
    const regex = new RegExp(/.+\.amazonaws.com\/(.+)/);
    const matched = url.match(regex);
    return matched[1]
      .split('/')
      .map((component) => decodeURIComponent(component))
      .join('/');
  }

  async deleteFiles(ids: number[]) {
    const deleteFilesCommand = ids.map((id) =>
      this.deleteFile({
        id,
      }),
    );
    const deletedFiles = await this.prisma.$transaction(deleteFilesCommand);

    return this.s3Service.deleteFiles(
      deletedFiles.map(({ path }) => this.getKey(path)),
    );
  }
}
