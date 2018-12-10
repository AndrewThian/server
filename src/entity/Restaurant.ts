import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    BaseEntity,
    Index,
    ManyToMany,
    JoinColumn
} from "typeorm";
import { Timestamp } from "./Timestamp";
import { Schedule } from "./Schedule";
import { Collection } from "./Collection";

@Entity()
export class Restaurant extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Index({ unique: true })
    @Column("varchar",{
        nullable: false,
        length: 255
    })
    name: string;

    @OneToMany(() => Schedule, schedules => schedules.restaurant)
    schedules: Schedule[]

    @ManyToMany(() => Collection, (collection) => collection.restaurants)
    collections: Collection[]

    @Column(() => Timestamp)
    timestamp: Timestamp

    static async upsert(name: string) {
        let restaurant = await this.findOne({ name })
        if (!restaurant) {
            const restaurant = this.create({ name })
            restaurant.name = name
            return this.save(restaurant)
        }
        return restaurant
    }
}