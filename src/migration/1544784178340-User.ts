import {MigrationInterface, QueryRunner} from "typeorm";

export class User1544784178340 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` ADD `accessToken` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `refreshToken` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `refreshToken`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `accessToken`");
    }

}
