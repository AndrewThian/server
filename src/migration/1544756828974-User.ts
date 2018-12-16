import {MigrationInterface, QueryRunner} from "typeorm";

export class User1544756828974 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `username`");
        await queryRunner.query("ALTER TABLE `user` ADD `email` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` ADD UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)");
        await queryRunner.query("ALTER TABLE `user` ADD `acesssToken` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` ADD UNIQUE INDEX `IDX_193ab631d18eb08e6d2c89d53d` (`acesssToken`)");
        await queryRunner.query("ALTER TABLE `user` ADD `refreshToken` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` ADD UNIQUE INDEX `IDX_03585d421deb10bbc326fffe4c` (`refreshToken`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP INDEX `IDX_03585d421deb10bbc326fffe4c`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `refreshToken`");
        await queryRunner.query("ALTER TABLE `user` DROP INDEX `IDX_193ab631d18eb08e6d2c89d53d`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `acesssToken`");
        await queryRunner.query("ALTER TABLE `user` DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `email`");
        await queryRunner.query("ALTER TABLE `user` ADD `username` varchar(255) NOT NULL");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`(`username`)");
    }
}
