import { InputType, Field } from "type-graphql";

@InputType()
export class CreateUserInput {
  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  email: string;
}
