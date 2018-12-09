import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    BaseEntity,
    Index,
    ManyToMany,
    JoinTable
} from "typeorm";
import { Timestamp } from "./Timestamp";
import { Schedule } from "./Schedule";
import { Collection } from "./Collection";

@Entity()
export class Restaurant extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Index("restaurant_name", { unique: true })
    @Column("varchar",{
        nullable: false,
        length: 255
    })
    name: string;

    @OneToMany(() => Schedule, schedules => schedules.restaurant)
    schedules: Schedule[]

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