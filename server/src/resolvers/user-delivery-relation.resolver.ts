import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserDeliveryRelation } from 'src/graphql/types/user-delivery-relation';
import { DeliveryService } from 'src/services';

@Resolver((of) => UserDeliveryRelation)
export class UserDeliveryRelationResolver {
  constructor(private deliveryService: DeliveryService) {}

  @ResolveField()
  async delivery(@Parent() userDeliveryRelation: UserDeliveryRelation) {
    return this.deliveryService.delivery({
      id: userDeliveryRelation.deliveryId,
    });
  }
}
