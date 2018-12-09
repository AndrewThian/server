import { 
    Index, 
    Entity, 
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Unique,
    BaseEntity
} from "typeorm"
import { Timestamp } from "./Timestamp"
import { Restaurant } from "./Restaurant";

interface Data {
    day: string
    open: string
    close: string
}

@Entity()
@Index("time_index", [ "openingHour", "closingHour" ])
@Index("date_time_index", [ "dayOfTheWeek", "openingHour", "closingHour" ])
@Unique("unique_schedule", [ "restaurant", "dayOfTheWeek", "openingHour", "closingHour" ])
export class Schedule extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Index("restaurant_id")
    @ManyToOne(() => Restaurant, restaurants => restaurants.schedules, {
        nullable: false,
        onDelete: "CASCADE",
        onUpdate: "RESTRICT"
    })
    @JoinColumn({ name: "restaurant_id" })
    restaurant: Restaurant | null;

    @Column("enum", {
        nullable: true,
        name: "day_of_week",
        enum:["SUN","MON","TUE","WED","THU","FRI","SAT"],
    })
    dayOfTheWeek: string | null;

    @Column("time", {
        nullable: false,
        name: "open_hour"
    })
    openingHour: string;

    @Column("time", {
        nullable: false,
        name: "close_hour"
    })
    closingHour: string;

    @Column(() => Timestamp)
    timestamp: Timestamp;

    static async upsert(restaurant: Restaurant, data: Data) {
        const partial = { 
            restaurant: restaurant, 
            dayOfTheWeek: data.day, 
            openingHour: data.open, 
            closingHour: data.close 
        }
        const schedule = await this.findOne(partial)
        if (!schedule) {
            const schedule = this.create(partial)
            return this.save(schedule)
        }
        return schedule
    }
}