import {MigrationInterface, QueryRunner} from "typeorm";

export class User1544784157923 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `accessToken`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `refreshToken`");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` ADD `refreshToken` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `accessToken` varchar(255) NOT NULL");
    }

}
