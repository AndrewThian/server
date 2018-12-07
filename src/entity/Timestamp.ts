import {
    Column, BeforeUpdate
} from "typeorm"

export class Timestamp {
    @Column("timestamp", {
        nullable: false,
        name: "created_at",
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt: Date;

    @Column("timestamp", {
        nullable: false,
        name: "updated_at",
        onUpdate: "CURRENT_TIMESTAMP",
        default: () => "CURRENT_TIMESTAMP"
    })
    updatedAt: Date;

    @BeforeUpdate()
    updateDate() {
        // refreshing the updatedAt date
        this.updatedAt = null;
    }
}