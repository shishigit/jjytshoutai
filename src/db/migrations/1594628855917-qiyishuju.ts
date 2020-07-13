import {MigrationInterface, QueryRunner} from "typeorm";

export class qiyishuju1594628855917 implements MigrationInterface
{
    public async down(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.query("ALTER TABLE `bumen` DROP FOREIGN KEY `FK_25644bf09d77915e5ecbe02f95e`");
        await queryRunner.query("ALTER TABLE `bumen` CHANGE `mingcheng` `mingcheng` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `bumen` CHANGE `beizhu` `beizhu` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `yonghu` CHANGE `mima` `mima` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `yonghu` CHANGE `zhanghao` `zhanghao` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `juese` CHANGE `shuoming` `shuoming` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `juese` CHANGE `mingcheng` `mingcheng` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `banben` CHANGE `shuoming` `shuoming` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `bumen` DROP COLUMN `parentId`");
        await queryRunner.query("ALTER TABLE `bumen` DROP COLUMN `mpath`");
    }

    name = 'qiyishuju1594628855917'

    public async up(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.query("ALTER TABLE `bumen` ADD `mpath` varchar(255) NULL DEFAULT ''");
        await queryRunner.query("ALTER TABLE `bumen` ADD `parentId` int NULL");
        await queryRunner.query("ALTER TABLE `banben` CHANGE `shuoming` `shuoming` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `juese` CHANGE `mingcheng` `mingcheng` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `juese` CHANGE `shuoming` `shuoming` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `yonghu` CHANGE `zhanghao` `zhanghao` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `yonghu` CHANGE `mima` `mima` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `bumen` CHANGE `beizhu` `beizhu` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `bumen` CHANGE `mingcheng` `mingcheng` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `bumen` ADD CONSTRAINT `FK_25644bf09d77915e5ecbe02f95e` FOREIGN KEY (`parentId`) REFERENCES `bumen`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
