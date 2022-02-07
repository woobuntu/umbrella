import { InputType, OmitType } from '@nestjs/graphql';
import { Orderer } from './orderer.model';

@InputType()
export class CreateOrdererInput extends OmitType(
  Orderer,
  ['paymentId'],
  InputType,
) {}
