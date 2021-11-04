import { InputType } from '@nestjs/graphql';

@InputType()
export class FilterCatalogsInput {
  ids: number[];
}
