import { ObjectType } from '@nestjs/graphql';
import { Option } from '../option';

@ObjectType()
export class CatalogOptionRelation {
  id: number;

  catalogId: number;

  optionId: number;

  option: Option;
}
