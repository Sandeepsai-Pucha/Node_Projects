import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    type: string

    @Column()
    category: string
}