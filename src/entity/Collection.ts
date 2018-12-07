import { 
    Index, 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from "typeorm";

import { Timestamp } from "./Timestamp"
import { User } from "./User";

 @Entity()
 @Index("user_id", [ "user" ])
 export class Collection {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.collections, {
        nullable: false,
        onDelete: "CASCADE",
        onUpdate: "RESTRICT",
    })
    @JoinColumn({ name: "user_id" })
    user: User

    @Column(() => Timestamp)
    timestamp: Timestamp;
 }