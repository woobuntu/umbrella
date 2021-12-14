import { ObjectType, OmitType } from '@nestjs/graphql';
import { Orderer } from '../orderer';

@ObjectType()
export class OrdererWithOutId extends OmitType(Orderer, ['id']) {}
