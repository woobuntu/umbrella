import { InputType, OmitType } from '@nestjs/graphql';
import { Orderer } from './orderer.model';

@InputType()
export class CreateOrdererInput extends OmitType(
  Orderer,
  ['id'] as const,
  InputType,
) {}
