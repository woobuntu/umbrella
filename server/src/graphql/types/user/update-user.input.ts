import { InputType, PickType } from '@nestjs/graphql';
import { User } from './user.model';

@InputType()
export class UpdateUserInput extends PickType(
  User,
  ['name', 'phone', 'email'],
  InputType,
) {}
