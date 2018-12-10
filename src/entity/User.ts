// import {Index,Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    BaseEntity,
    AfterLoad,
    AfterInsert,
    Unique
} from "typeorm";

import { Timestamp } from "./Timestamp"
import { Collection } from "./Collection";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn({
        name:"id"
    })
    id: number;

    @Column("varchar",{
        nullable: false,
        length: 255,
        unique: true
    })
    username: string;

    @OneToMany(() => Collection, collections => collections.user, {
        onDelete: "CASCADE",
        onUpdate: "RESTRICT"
    })
    collections: Collection[]

    @Column(() => Timestamp)
    timestamp: Timestamp
}