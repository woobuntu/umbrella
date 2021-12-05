import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Delivery {
  id: number;

  name: string;

  phone: string;

  postCode: string;

  address: string;

  detailAddress: string;

  memo?: string;

  orderStatus?: string;
  // 추후 결제대기 | 결제완료 | 상품준비중 | 배송중 | 배송완료 | 취소완료 의 Union으로 수정
}
