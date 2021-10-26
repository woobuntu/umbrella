import { Query, Resolver } from '@nestjs/graphql';
import { Meta } from 'src/graphql/types/meta';
import { MetaService } from 'src/services';

@Resolver((of) => Meta)
export class MetaResolver {
  constructor(private metaService: MetaService) {}

  @Query((returns) => Meta)
  async meta() {
    return this.metaService.meta();
  }
}
