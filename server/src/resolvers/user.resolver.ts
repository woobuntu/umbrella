import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput, User } from 'src/graphql/types/user';
import { UserService } from 'src/services';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation((returns) => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }
}
