import { Entity, PrimaryGeneratedColumn, Column, ChildEntity } from "typeorm";
import { Content } from "./Content";

@Entity()
export class Photo extends Content {
  @Column()
  view_count: number;
}
