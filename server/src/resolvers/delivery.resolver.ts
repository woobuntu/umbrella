import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  Delivery,
  UpdateNumberOfInvoiceInput,
} from 'src/graphql/types/delivery';
import { AdminGuard } from 'src/guards/admin.guard';
import { DeliveryService } from 'src/services';

@Resolver((of) => Delivery)
export class DeliveryResolver {
  constructor(private deliveryService: DeliveryService) {}

  @UseGuards(AdminGuard)
  @Mutation((returns) => Delivery)
  updateNumberOfInvoice(
    @Args('updateNumberOfInvoiceInput')
    updateNumberOfInvoiceInput: UpdateNumberOfInvoiceInput,
  ) {
    const { paymentId, numberOfInvoice } = updateNumberOfInvoiceInput;
    return this.deliveryService.updateDelivery({
      where: {
        paymentId,
      },
      data: {
        numberOfInvoice,
      },
    });
  }
}
