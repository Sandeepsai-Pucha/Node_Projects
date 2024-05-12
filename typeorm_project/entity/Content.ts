import { Entity, TableInheritance, PrimaryGeneratedColumn, Column } from "typeorm";

export abstract class Content {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string
}