import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { BasketService, UserService } from 'src/services';
import { AuthGuard } from './auth.guard';

// https://github.com/nestjs/nest/issues/873
@Injectable()
export class TossPaymentsGuard extends AuthGuard implements CanActivate {
  constructor(
    private basketService: BasketService,
    protected readonly userService: UserService,
  ) {
    super(userService);
  }

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const {
      request: {
        session,
        body: { variables },
      },
    } = ctx.getContext();

    const {
      tossPaymentsInput: { amount },
    } = variables;

    const user = session.get('user');

    // 타입 생성이 쉽지 않다
    // https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types#problem-getting-access-to-the-return-type-of-a-function
    const baskets: any[] = await this.basketService.baskets({
      where: {
        userId: user.id,
      },
      include: {
        productOptionRelation: {
          include: {
            product: true,
            option: true,
          },
        },
      },
    });

    const basketTotalPrice = baskets.reduce(
      (sum, { quantity, productOptionRelation: { product, option } }) =>
        sum + quantity * (product.price + option.price),
      0,
    );

    const deliveryFee = basketTotalPrice >= 50000 ? 0 : 3000;

    if (amount !== basketTotalPrice + deliveryFee) return false;

    session.set('basketsAndDeliveryFee', {
      baskets,
      deliveryFee,
    });

    return super.canActivate(context);
  }
}
