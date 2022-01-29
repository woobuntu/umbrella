import { Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConfig } from 'src/types/config';

@Injectable()
export class S3Service {
  s3Client: S3Client;

  constructor(private configService: ConfigService) {
    const { region } = this.configService.get<EnvironmentConfig>('environment');

    this.s3Client = new S3Client({
      region,
    });
  }
}
