import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FindManyPerformanceParams } from 'src/types/performance';
import { PrismaService } from './prisma.service';
import { S3Service } from './s3.service';

@Injectable()
export class PerformanceService {
  constructor(private prisma: PrismaService, private s3Service: S3Service) {}

  async performance(
    performanceWhereUniqueInput: Prisma.PerformanceWhereUniqueInput,
  ) {
    return this.prisma.performance.findUnique({
      where: performanceWhereUniqueInput,
    });
  }

  async performanceHistory(where: Prisma.PerformanceHistoryWhereInput) {
    return this.prisma.performanceHistory.findFirst({
      where,
    });
  }

  async performances(params: FindManyPerformanceParams) {
    return this.prisma.performance.findMany(params);
  }

  getKey(url: string) {
    const regex = new RegExp(/.+\.amazonaws.com\/(.+)/);
    const matched = url.match(regex);
    return matched[1]
      .split('/')
      .map((component) => decodeURIComponent(component))
      .join('/');
  }

  async compareContent(params: { prevContent: string; nextContent: string }) {
    const { prevContent, nextContent } = params;

    const parsedPrevContent = JSON.parse(prevContent);
    const parsedNextContent = JSON.parse(nextContent);

    const imagesToBeDeleted = {};
    for (const { insert } of parsedPrevContent) {
      if (insert.hasOwnProperty('image')) {
        imagesToBeDeleted[insert.image] = true;
      }
    }
    for (const { insert } of parsedNextContent) {
      if (insert.hasOwnProperty('image')) {
        if (imagesToBeDeleted.hasOwnProperty(insert.image)) {
          delete imagesToBeDeleted[insert.image];
        }
      }
    }
    const Objects = Object.keys(imagesToBeDeleted).map((url) =>
      this.getKey(url),
    );

    return this.s3Service.deleteFiles(Objects);
  }

  async convertContent(params: { title: string; content: string }) {
    const { title, content } = params;

    const parsedContent = JSON.parse(content);

    const convertedContent = [];

    for (const { insert } of parsedContent) {
      if (insert.hasOwnProperty('image')) {
        const regex = new RegExp(/^data:(image\/\w+);base64,(.+)/);
        const matched = insert.image.match(regex);
        if (!matched) {
          convertedContent.push({
            insert,
          });
        } else {
          const [_, ContentType, base64String] = matched;
          const Body = Buffer.from(base64String, 'base64');

          convertedContent.push({
            insert: {
              image: await this.s3Service.uploadFile({
                Key: `performances/${title}/${encodeURIComponent(
                  base64String.slice(0, 30),
                )}`,
                Body,
                ContentType,
              }),
            },
          });
        }
      } else {
        convertedContent.push({
          insert,
        });
      }
    }

    return { title, content: JSON.stringify(convertedContent) };
  }

  async createPerformance(data: Prisma.PerformanceCreateInput) {
    return this.prisma.performance.create({
      data,
    });
  }

  async updatePerformance(params: {
    where: Prisma.PerformanceWhereUniqueInput;
    data: Prisma.PerformanceUpdateInput;
  }) {
    return this.prisma.performance.update(params);
  }

  async deletePerformance(where: Prisma.PerformanceWhereUniqueInput) {
    const { content } = await this.performance({
      id: where.id,
    });
    const parsedContent = JSON.parse(content);
    const imagesToBeDeleted = [];
    for (const { insert } of parsedContent) {
      if (insert.hasOwnProperty('image')) {
        imagesToBeDeleted.push(this.getKey(insert.image));
      }
    }
    return Promise.all([
      this.s3Service.deleteFiles(imagesToBeDeleted),
      this.prisma.performance.delete({
        where,
      }),
    ]);
  }
}
