import {Index,Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";
import {collections} from "./collections";


@Entity("users",{schema:"dev"})
export class users {

    @PrimaryGeneratedColumn({ 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:11
        })
    username:string;
        

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
        

   
    @OneToMany(type=>collections, collections=>collections.user_,{ onDelete: 'CASCADE' ,onUpdate: 'RESTRICT' })
    collectionss:collections[];
    
}
