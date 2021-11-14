import { ObjectType } from '@nestjs/graphql';
import { Catalog } from '../catalog';
import { Option } from '../option';

@ObjectType()
export class CatalogOptionRelation {
  id: number;

  catalogId: number;

  catalog: Catalog;

  optionId: number;

  option: Option;
}
