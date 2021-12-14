import { ObjectType, OmitType } from '@nestjs/graphql';
import { Delivery } from '../delivery';

@ObjectType()
export class DeliveryWithOutId extends OmitType(Delivery, ['id']) {}
