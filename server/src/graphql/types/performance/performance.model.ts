import { ObjectType } from '@nestjs/graphql';
import { PerformanceFileRelation } from '../performance-file-relation';

@ObjectType()
export class Performance {
  id: number;

  title: string;

  content: string;

  timestamp: Date;

  performanceFileRelations: PerformanceFileRelation[];
}
