import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePaymentInput {
  paymentId: number;

  orderStatus: string;
  // 추후 union으로 수정 필요
  // 결제대기
  // 결제완료
  // 상품준비중
  // 배송시작
  // 배송중
  // 배송완료
}
