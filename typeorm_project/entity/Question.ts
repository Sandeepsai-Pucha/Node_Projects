import { Entity, PrimaryGeneratedColumn, Column, ChildEntity } from "typeorm";
import { Content } from "./Content";

@Entity()
export class Question extends Content {
  @Column()
  question_count: string;
}
