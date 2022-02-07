import { Query, Resolver } from '@nestjs/graphql';
import { History } from 'src/graphql/types/history';
import { HistoryService } from 'src/services';

@Resolver((of) => History)
export class HistoryResolver {
  constructor(private historyService: HistoryService) {}

  @Query((returns) => [History])
  async histories() {
    return this.historyService.histories();
  }
}
