import { Field, ObjectType, InputType } from "type-graphql";
import { Length } from "class-validator";

@ObjectType()
export class Task {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  updated: Date;

  @Field()
  created: Date;

  @Field()
  is_Completed: boolean;
}

@InputType()
export class CreateTaskInput implements Partial<Task> {
  @Field()
  @Length(2, 50)
  title: string;
}

@InputType()
export class UpdateTaskInput implements Partial<Task> {
  @Field()
  @Length(2, 50)
  title: string;
}

