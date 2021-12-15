import { ObjectType } from '@nestjs/graphql';
import { Product } from '../product';
import { Option } from '../option';

@ObjectType()
export class ProductOptionRelation {
  id: number;

  productId: number;

  product: Product;

  optionId: number;

  option: Option;
}
