import {Index,Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";
import {users} from "./users";
import {collection_restaurants} from "./collection_restaurants";


@Entity("collections",{schema:"dev"})
@Index("user_id",["user_",])
export class collections {

    @PrimaryGeneratedColumn({ 
        name:"id"
        })
    id:number;
        

    @Column("timestamp",{ 
        nullable:false,
        default:"CURRENT_TIMESTAMP",
        name:"created_at"
        })
    created_at:Date;
        

    @Column("timestamp",{ 
        nullable:false,
        default:"CURRENT_TIMESTAMP",
        name:"updated_at"
        })
    updated_at:Date;
        

   
    @ManyToOne(type=>users, users=>users.collectionss,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'user_id'})
    user_:users | null;


   
    @OneToMany(type=>collection_restaurants, collection_restaurants=>collection_restaurants.collection_,{ onDelete: 'CASCADE' ,onUpdate: 'RESTRICT' })
    collection_restaurantss:collection_restaurants[];
    
}
