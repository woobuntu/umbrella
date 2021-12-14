export interface BasketsForPurchase {
  baskets: any[];
  // catalog와 option의 depth 때문에 any로
  // 추후 수정 필요
  deliveryFee: number;
}
