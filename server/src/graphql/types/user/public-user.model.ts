import { ObjectType, OmitType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class PublicUser extends OmitType(User, [
  'accessToken',
  'refreshToken',
]) {}
