// User.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Tasks } from "./Task";
import { Field, ID, ObjectType } from "type-graphql";

@Entity("user")
@ObjectType()
export class User {
  @PrimaryGeneratedColumn({ type: "int" })
  @Field(() => ID)
  id: number;

  @Column({ type: "varchar", length: 255 })
  @Field(() => String)
  first_name: string;

  @Column({ type: "varchar", length: 255 })
  @Field(() => String)
  last_name: string;

  @Column({ type: "int" })
  @Field(() => Number)
  age: number;

  @CreateDateColumn({
    type: "timestamp",
    precision: 6,
    nullable: true,
  })
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    precision: 6,
    nullable: true,
  })
  @Field(() => Date)
  updated_at: Date;

  // relationships

  @OneToMany(() => Tasks, (task) => task.user, { onDelete: "CASCADE"})
  @Field(() => Tasks)
  tasks: Tasks[];
}
