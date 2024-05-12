import { Query, Resolver } from "type-graphql";

@Resolver()
export class TaskResolver {
  @Query()
  hello(): string {
    return "Hello From Apollo Server..!!";
  }
}
