// Task.ts

import {
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ObjectType, ID, Field, Int } from "type-graphql";
import { User } from "./User";

@Entity("tasks")
@ObjectType()
export class Tasks {
  @PrimaryGeneratedColumn({ type: "int" })
  @Field(() => ID)
  id: number;

  @Column({ default: false, nullable: true, type: "varchar", length: 255 })
  @Field(() => String)
  title: string;

  @Column({ nullable: true, type: "varchar", length: 255 })
  @Field(() => String)
  description: string;

  @Column({ default: false, nullable: true, type: "varchar", length: 255 })
  @Field(() => Boolean)
  is_completed: boolean;

  @CreateDateColumn({
    type: "timestamp",
    precision: 6,
    nullable: true,
  })
  @Field(() => Date)
  created: Date;

  @UpdateDateColumn({
    type: "timestamp",
    precision: 6,
    nullable: true,
  })
  @Field(() => Date)
  updated: Date;

  @Column({ type: "int" })
  @Field(() => Number)
  user_id: number;

  // relationships

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: "user_id" })
  @Field(() => User)
  user: User;
}
