import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Gnb } from 'src/graphql/types/gnb';
import { GnbService, LnbService } from 'src/services';

@Resolver((of) => Gnb)
export class GnbResolver {
  constructor(private gnbService: GnbService, private lnbService: LnbService) {}

  @Query((returns) => [Gnb])
  async gnbs() {
    return this.gnbService.gnbs();
  }

  @ResolveField()
  async lnbs(@Parent() gnb: Gnb) {
    return this.lnbService.lnbs({
      where: {
        gnbId: gnb.id,
      },
    });
  }
}
