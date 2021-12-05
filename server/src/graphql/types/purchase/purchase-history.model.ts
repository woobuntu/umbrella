import { ObjectType } from '@nestjs/graphql';

// Purchase로부터 extend하여 정의하지 않은 이유는, Purchase가 PurchaseHistory를 참조해야 하기 때문에
// 순환참조하는 것을 막기 위함
@ObjectType()
export class PurchaseHistory {
  id: number;

  userId: string;

  catalogOptionRelationId: number;

  ordererId: number;

  deliveryId: number;

  paymentId: number;

  amount: number;

  purchaseId?: number;

  from: Date;
  // 주문 목록 조회할 때 주문 일시를 확인하기 위함이므로 to는 필요없음
}
