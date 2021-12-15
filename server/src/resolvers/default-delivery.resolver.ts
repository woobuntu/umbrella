import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators';
import {
  DefaultDelivery,
  UpdateDefaultDeliveryInput,
} from 'src/graphql/types/default-delivery';
import { User } from 'src/graphql/types/user';
import { AuthGuard } from 'src/guards';
import { DefaultDeliveryService } from 'src/services';

@Resolver((of) => DefaultDelivery)
export class DefaultDeliveryResolver {
  constructor(private defaultDeliveryService: DefaultDeliveryService) {}

  @UseGuards(AuthGuard)
  @Mutation((returns) => DefaultDelivery)
  async updateDefaultDelivery(
    @CurrentUser() user: User,
    @Args('updateDefaultDeliveryInput')
    updateDefaultDeliveryInput: UpdateDefaultDeliveryInput,
  ) {
    return this.defaultDeliveryService.updateDefaultDelivery({
      where: {
        userId: user.id,
      },
      data: updateDefaultDeliveryInput,
    });
  }
}
