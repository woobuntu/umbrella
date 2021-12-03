import { Prisma } from '.prisma/client';
import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { Delivery, UpdateDeliveryInput } from 'src/graphql/types/delivery';
import { AuthGuard } from 'src/guards';
import { DeliveryService } from 'src/services';

@Resolver((of) => Delivery)
export class DeliveryResolver {
  constructor(private deliveryService: DeliveryService) {}

  @UseGuards(AuthGuard)
  @Mutation((returns) => Delivery)
  async updateDelivery(
    @Args('deliveryId', { type: () => Int }) deliveryId: number,
    @Args('updateDeliveryInput') updateDeliveryInput: UpdateDeliveryInput,
  ) {
    return this.deliveryService.updateDelivery({
      where: {
        id: deliveryId,
      },
      data: updateDeliveryInput,
    });
  }
}
