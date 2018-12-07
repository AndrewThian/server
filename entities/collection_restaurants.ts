import {Index,Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";
import {collections} from "./collections";
import {restaurants} from "./restaurants";


@Entity("collection_restaurants",{schema:"dev"})
@Index("collection_id",["collection_",])
@Index("restaurant_id",["restaurant_",])
export class collection_restaurants {

    @PrimaryGeneratedColumn({ 
        name:"id"
        })
    id:number;
        

   
    @ManyToOne(type=>collections, collections=>collections.collection_restaurantss,{ nullable:false,onDelete: 'CASCADE',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'collection_id'})
    collection_:collections | null;


   
    @ManyToOne(type=>restaurants, restaurants=>restaurants.collection_restaurantss,{ onDelete: 'SET NULL',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'restaurant_id'})
    restaurant_:restaurants | null;


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
        
}
