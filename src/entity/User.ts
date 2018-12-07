// import {Index,Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany
} from "typeorm";

import { Timestamp } from "./Timestamp"
import { Collection } from "./Collection";

@Entity()
export class User {

    @PrimaryGeneratedColumn({
        name:"id"
    })
    id: number;

    @Column("varchar",{
        nullable: false,
        length: 255
    })
    username: string;

    @OneToMany(() => Collection, collections => collections.user )
    collections: Collection[]

    @Column(() => Timestamp)
    timestamp: Timestamp
}