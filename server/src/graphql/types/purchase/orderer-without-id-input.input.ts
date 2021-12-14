import { InputType, OmitType } from '@nestjs/graphql';
import { Orderer } from '../orderer';

@InputType()
export class OrdererWithOutIdInput extends OmitType(
  Orderer,
  ['id'],
  InputType,
) {}
