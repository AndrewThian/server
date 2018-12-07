// import { 
//     Index, 
//     Entity, 
//     PrimaryGeneratedColumn,
//     Column,
//     Timestamp,
//     ManyToOne,
//     JoinColumn
// } from "typeorm"
// import { Restaurant } from "./Restaurant";

// @Entity()
// @Index("restaurant_id", [ "restaurant" ])
// @Index("date_time_index", [ "dayOfTheWeek", "openingHour", "closingHour" ])
// export class Schedule {

//     @PrimaryGeneratedColumn()
//     id: number;

//     @ManyToOne(() => Restaurant, restaurants => restaurants.schedules, {
//         nullable: false,
//         onDelete: "CASCADE",
//         onUpdate: "RESTRICT"
//     })
//     @JoinColumn({ name: "restaurant_id" })
//     restaurant: Restaurant

//     @Column("enum", {
//         nullable: true,
//         name: "day_of_week",
//         enum:["SUN","MON","TUE","WED","THU","FRI","SAT"],
//     })
//     dayOfTheWeek: string | null;

//     @Column("time", {
//         nullable: false,
//         name: "open_hour"
//     })
//     openingHour: string;

//     @Column("time", {
//         nullable: false,
//         name: "close_hour"
//     })
//     closingHour: string;

//     @Column(() => Timestamp)
//     timestamp: Timestamp;
// }