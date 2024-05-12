import { Entity, PrimaryGeneratedColumn, Column, ChildEntity } from "typeorm";
import { Content } from "./Content";

@Entity()
export class Post extends Content {
  @Column()
  size: string;
}
