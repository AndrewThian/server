import {MigrationInterface, QueryRunner} from "typeorm";

export class User1544781376955 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_193ab631d18eb08e6d2c89d53d` ON `user`");
        await queryRunner.query("ALTER TABLE `user` CHANGE `acesssToken` `accessToken` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `accessToken`");
        await queryRunner.query("ALTER TABLE `user` ADD `accessToken` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` ADD UNIQUE INDEX `IDX_7b0580ed0bf7364a7d4d11d5b2` (`accessToken`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP INDEX `IDX_7b0580ed0bf7364a7d4d11d5b2`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `accessToken`");
        await queryRunner.query("ALTER TABLE `user` ADD `accessToken` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `accessToken` `acesssToken` varchar(255) NOT NULL");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_193ab631d18eb08e6d2c89d53d` ON `user`(`acesssToken`)");
    }

}
