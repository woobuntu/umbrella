import { ObjectType } from '@nestjs/graphql';
import { File } from '../file';

@ObjectType()
export class PerformanceFileRelation {
  id: number;

  performanceId: number;

  fileId: number;

  file: File;
}
