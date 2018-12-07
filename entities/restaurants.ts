import {Index,Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";
import {collection_restaurants} from "./collection_restaurants";
import {schedules} from "./schedules";


@Entity("restaurants",{schema:"dev"})
export class restaurants {

    @PrimaryGeneratedColumn({ 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:255,
        default:"",
        name:"name"
        })
    name:string;
        

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
        

   
    @OneToMany(type=>collection_restaurants, collection_restaurants=>collection_restaurants.restaurant_,{ onDelete: 'SET NULL' ,onUpdate: 'RESTRICT' })
    collection_restaurantss:collection_restaurants[];
    

   
    @OneToMany(type=>schedules, schedules=>schedules.restaurant_,{ onDelete: 'CASCADE' ,onUpdate: 'RESTRICT' })
    scheduless:schedules[];
    
}
