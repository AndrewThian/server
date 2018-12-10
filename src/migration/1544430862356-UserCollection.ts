import {MigrationInterface, QueryRunner} from "typeorm";

export class UserCollection1544430862356 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` ADD UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`)");
        await queryRunner.query("ALTER TABLE `collection` CHANGE `timestampCreated_at` `timestampCreated_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_83ce12befc4ab74a2d43c23c45` ON `collection`(`userId`, `name`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_83ce12befc4ab74a2d43c23c45` ON `collection`");
        await queryRunner.query("ALTER TABLE `collection` CHANGE `timestampCreated_at` `timestampCreated_at` timestamp(3) NOT NULL DEFAULT 'CURRENT_TIMESTAMP(3)' ON UPDATE CURRENT_TIMESTAMP(3)");
        await queryRunner.query("ALTER TABLE `user` DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed`");
    }
}
