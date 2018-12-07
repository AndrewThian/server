// import { 
//     Entity,
//     PrimaryGeneratedColumn,
//     Column,
//     OneToMany
// } from "typeorm";
// import { Timestamp } from "./Timestamp";
// import { Schedule } from "./Schedule";

// @Entity()
// export class Restaurant {
    
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column("varchar",{
//         nullable: false,
//         length: 255
//     })
//     name: string;

//     @OneToMany(() => Schedule, schedules => schedules.restaurant)
//     schedules: Schedule[]

//     @Column(() => Timestamp)
//     timestamp: Timestamp
// }