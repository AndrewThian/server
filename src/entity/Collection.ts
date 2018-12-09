import { 
    Index, 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
} from "typeorm";

import { Timestamp } from "./Timestamp"
import { User } from "./User";
import { Restaurant } from "./Restaurant";

 @Entity()
 export class Collection {
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