import {MigrationInterface, QueryRunner} from "typeorm";

export class User1544784214953 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `accessToken` `accessToken` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `refreshToken` `refreshToken` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `refreshToken` `refreshToken` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `accessToken` `accessToken` varchar(255) NOT NULL DEFAULT ''");
    }

}
