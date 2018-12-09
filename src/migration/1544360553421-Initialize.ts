import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1544360553421 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `timestampCreated_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), `timestampUpdated_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `schedule` (`id` int NOT NULL AUTO_INCREMENT, `day_of_week` enum ('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT') NULL, `open_hour` time NOT NULL, `close_hour` time NOT NULL, `restaurantId` int NOT NULL, `timestampCreated_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), `timestampUpdated_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3), INDEX `IDX_c69f51bc758fff79f17b652a94` (`restaurantId`), INDEX `IDX_bcfdfa10ade1ee953f271303e8` (`day_of_week`, `open_hour`, `close_hour`), INDEX `IDX_6db0ae87290e6566396b81c599` (`open_hour`, `close_hour`), UNIQUE INDEX `IDX_ff89d5448299a47756252fcc24` (`restaurantId`, `day_of_week`, `open_hour`, `close_hour`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `restaurant` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `timestampCreated_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), `timestampUpdated_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3), UNIQUE INDEX `IDX_9315499c5bf5ead89fbb877a0b` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `collection` (`id` int NOT NULL AUTO_INCREMENT, `userId` int NOT NULL, `timestampCreated_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), `timestampUpdated_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3), INDEX `IDX_ca25eb01f75a85272300f33602` (`userId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `collection_restaurants_restaurant` (`collectionId` int NOT NULL, `restaurantId` int NOT NULL, PRIMARY KEY (`collectionId`, `restaurantId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `schedule` ADD CONSTRAINT `FK_c69f51bc758fff79f17b652a94b` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `collection` ADD CONSTRAINT `FK_ca25eb01f75a85272300f336029` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `collection_restaurants_restaurant` ADD CONSTRAINT `FK_b8b8c48f81f4776fdf975010276` FOREIGN KEY (`collectionId`) REFERENCES `collection`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `collection_restaurants_restaurant` ADD CONSTRAINT `FK_e4b453a2402c3b259aecba52766` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant`(`id`) ON DELETE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `collection_restaurants_restaurant` DROP FOREIGN KEY `FK_e4b453a2402c3b259aecba52766`");
        await queryRunner.query("ALTER TABLE `collection_restaurants_restaurant` DROP FOREIGN KEY `FK_b8b8c48f81f4776fdf975010276`");
        await queryRunner.query("ALTER TABLE `collection` DROP FOREIGN KEY `FK_ca25eb01f75a85272300f336029`");
        await queryRunner.query("ALTER TABLE `schedule` DROP FOREIGN KEY `FK_c69f51bc758fff79f17b652a94b`");
        await queryRunner.query("DROP TABLE `collection_restaurants_restaurant`");
        await queryRunner.query("DROP INDEX `IDX_ca25eb01f75a85272300f33602` ON `collection`");
        await queryRunner.query("DROP TABLE `collection`");
        await queryRunner.query("DROP INDEX `IDX_9315499c5bf5ead89fbb877a0b` ON `restaurant`");
        await queryRunner.query("DROP TABLE `restaurant`");
        await queryRunner.query("DROP INDEX `IDX_ff89d5448299a47756252fcc24` ON `schedule`");
        await queryRunner.query("DROP INDEX `IDX_6db0ae87290e6566396b81c599` ON `schedule`");
        await queryRunner.query("DROP INDEX `IDX_bcfdfa10ade1ee953f271303e8` ON `schedule`");
        await queryRunner.query("DROP INDEX `IDX_c69f51bc758fff79f17b652a94` ON `schedule`");
        await queryRunner.query("DROP TABLE `schedule`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
