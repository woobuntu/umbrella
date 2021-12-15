import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class KakaoPayPrepareResult {
  webRedirectUrl: string;
  mobileRedirectUrl: string;
}
