import { Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Meta } from 'src/graphql/types/meta';
import { MetaFileRelationService, MetaService } from 'src/services';

@Resolver((of) => Meta)
export class MetaResolver {
  constructor(
    private metaService: MetaService,
    private metaFileRelationService: MetaFileRelationService,
  ) {}

  @Query((returns) => Meta)
  async meta() {
    return this.metaService.meta();
  }

  @ResolveField()
  async metaFileRelations() {
    return this.metaFileRelationService.metaFileRelations({
      where: {
        metaId: 1,
      },
    });
  }
}
