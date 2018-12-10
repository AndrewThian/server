import { 
    Index, 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
    BaseEntity,
    Unique,
} from "typeorm";

import { Timestamp } from "./Timestamp"
import { User } from "./User";
import { Restaurant } from "./Restaurant";

 @Entity()
 @Unique([ "user", "name" ])
 export class Collection extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @ManyToOne(() => User, user => user.collections, {
        nullable: false,
        onDelete: "CASCADE",
        onUpdate: "RESTRICT",
    })
    @JoinColumn()
    user: User

    @Index()
    @Column("varchar", {
        nullable: false,
        length: 255
    })
    name: string

    @ManyToMany(() => Restaurant, (restaurant) => restaurant.collections, {
        nullable: false,
        onDelete: "CASCADE",
        onUpdate: "RESTRICT"
    })
    @JoinTable()
    restaurants: Restaurant[]

    @Column(() => Timestamp)
    timestamp: Timestamp;
 }