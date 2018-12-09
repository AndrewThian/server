import { 
    Entity,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    Column,
    OneToMany,
    Unique,
    BaseEntity
} from "typeorm";
import { Timestamp } from "./Timestamp";
import { Schedule } from "./Schedule";

@Entity()
@Unique("unique_name", [ "name" ])
export class Restaurant extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar",{
        nullable: false,
        length: 255
    })
    name: string;

    @OneToMany(() => Schedule, schedules => schedules.restaurant)
    schedules: Schedule[]

    @Column(() => Timestamp)
    timestamp: Timestamp

    static async createOrUpdate(name: string) {
        let restaurant = await this.findOne({ name })
        if (!restaurant) {
            const restaurant = new Restaurant()
            restaurant.name = name
            return this.save(restaurant)
        }
        return restaurant
    }
}