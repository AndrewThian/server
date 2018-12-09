import {
    Column, BeforeUpdate
} from "typeorm"

export class Timestamp {
    @Column("timestamp", {
        precision: 3,
        nullable: false,
        name: "created_at",
        default: () => "CURRENT_TIMESTAMP(3)"
    })
    createdAt: Date;

    @Column("timestamp", {
        precision: 3,
        nullable: false,
        name: "updated_at",
        onUpdate: "CURRENT_TIMESTAMP(3)",
        default: () => "CURRENT_TIMESTAMP(3)"
    })
    updatedAt: Date;

    @BeforeUpdate()
    updateDate() {
        // refreshing the updatedAt date
        this.updatedAt = null;
    }
}