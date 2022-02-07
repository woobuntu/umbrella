import { Field, InputType } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload';
import { Upload } from '../file';

@InputType()
export class CreatePerformanceInput {
  title: string;

  content: string;

  timestamp: Date;

  @Field(() => [Upload])
  files?: FileUpload[];
}
