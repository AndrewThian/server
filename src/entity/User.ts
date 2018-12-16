import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    BaseEntity
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
    email: string;

    @Column("varchar", {
        length: 255,
        nullable: true
    })
    accessToken: string;

    @Column("varchar", {
        length: 255,
        nullable: true
    })
    refreshToken: string;

    @OneToMany(() => Collection, collections => collections.user, {
        onDelete: "CASCADE",
        onUpdate: "RESTRICT"
    })
    collections: Collection[]

    @Column(() => Timestamp)
    timestamp: Timestamp
}