import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { BasketService } from 'src/services';
import { AuthGuard } from './auth.guard';

// https://github.com/nestjs/nest/issues/873
@Injectable()
export class PurchaseGuard extends AuthGuard implements CanActivate {
  constructor(private basketService: BasketService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const {
      request: {
        session,
        body: {
          variables: {
            createPurchaseInput: {
              payment: { amount },
            },
          },
        },
      },
    } = ctx.getContext();

    const user = session.get('user');

    // 타입 생성이 쉽지 않다
    // https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types#problem-getting-access-to-the-return-type-of-a-function
    const baskets: any[] = await this.basketService.baskets({
      where: {
        userId: user.id,
      },
      include: {
        catalogOptionRelation: {
          include: {
            catalog: true,
          },
        },
      },
    });

    const exactAmount = baskets.reduce(
      (
        sum,
        {
          amount,
          catalogOptionRelation: {
            catalog: { price },
          },
        },
      ) => sum + amount * price,
      3000, // 배송료
    );

    if (amount !== exactAmount) return false;

    return super.canActivate(context);
  }
}