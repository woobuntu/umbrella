import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AccessToken, CreateUserInput, User } from 'src/graphql/types/user';
import { NaverAuthPayload } from 'src/graphql/types/user/naver-auth-payload.input';
import { UserService } from 'src/services';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation((returns) => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }

  // @Mutation((returns) => AccessToken)
  // async naverSignIn(
  //   @Args('naverAuthPayload') naverAuthPayload: NaverAuthPayload,
  // ) {
  //   return new Promise((resolve) => resolve({ accessToken: 'fuck' }));
  // }
}
