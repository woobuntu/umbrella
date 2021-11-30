import { ObjectType, OmitType } from '@nestjs/graphql';
import { UserDeliveryRelation } from '../user-delivery-relation';
import { User } from './user.model';

@ObjectType()
export class PublicUser extends OmitType(User, [
  'accessToken',
  'refreshToken',
]) {
  // User 클래스에서 userDeliveryRelations를 정의했더라도
  // 이렇게 상속된 클래스에서 아래와 같이 정의하지 않으면
  // PublicUser를 반환하는 Resolver의 ResolveField에서 타입 추론이 작동하지 않는다.
  // 따라서 User Resolver를 따로 사용하지 않는 경우에는 User가 아닌 PublicUser에서
  // 이런 관계 필드를 정의해주는 것이 좋다.
  userDeliveryRelations: UserDeliveryRelation[];
}
