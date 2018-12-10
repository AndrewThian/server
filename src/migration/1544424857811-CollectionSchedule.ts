import {MigrationInterface, QueryRunner} from "typeorm";

export class CollectionSchedule1544424857811 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `collection` ADD `name` varchar(255) NOT NULL");
        await queryRunner.query("CREATE INDEX `IDX_926e7bdc3f52cd582078a379f1` ON `collection`(`name`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_926e7bdc3f52cd582078a379f1` ON `collection`");
        await queryRunner.query("ALTER TABLE `collection` DROP COLUMN `name`");
    }

}
