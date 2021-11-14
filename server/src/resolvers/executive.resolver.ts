import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Executive } from 'src/graphql/types/executive';
import {
  CareerService,
  ExecutiveFileRelationService,
  ExecutiveService,
} from 'src/services';

@Resolver(Executive)
export class ExecutiveResolver {
  constructor(
    private executiveService: ExecutiveService,
    private careerService: CareerService,
    private executiveFileRelationService: ExecutiveFileRelationService,
  ) {}

  @Query((returns) => Executive)
  async executive(@Args('id', { type: () => Int }) id: number) {
    return this.executiveService.executive({
      id,
    });
  }

  @ResolveField()
  async careers(@Parent() executive: Executive) {
    return this.careerService.careers({
      where: {
        executiveId: executive.id,
      },
    });
  }

  @ResolveField()
  async executiveFileRelations(@Parent() executive: Executive) {
    return this.executiveFileRelationService.executiveFileRelations({
      where: {
        executiveId: executive.id,
      },
    });
  }
}
