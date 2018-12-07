import {Index,Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";
import {restaurants} from "./restaurants";


@Entity("schedules",{schema:"dev"})
@Index("restaurant_id",["restaurant_",])
@Index("date_time_index",["day_of_week","open_hour","close_hour",])
@Index("time_index",["open_hour","updated_at",])
export class schedules {

    @PrimaryGeneratedColumn({ 
        name:"id"
        })
    id:number;
        

   
    @ManyToOne(type=>restaurants, restaurants=>restaurants.scheduless,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'restaurant_id'})
    restaurant_:restaurants | null;


    @Column("enum",{ 
        nullable:true,
        enum:["SUN","MON","TUE","WED","THU","FRI","SAT"],
        name:"day_of_week"
        })
    day_of_week:string | null;
        

    @Column("time",{ 
        nullable:false,
        name:"open_hour"
        })
    open_hour:string;
        

    @Column("time",{ 
        nullable:false,
        name:"close_hour"
        })
    close_hour:string;
        

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
