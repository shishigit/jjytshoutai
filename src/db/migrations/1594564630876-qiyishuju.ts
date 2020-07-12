import {MigrationInterface, QueryRunner} from "typeorm";

export class qiyishuju_1594564630876 implements MigrationInterface
{
    public async down(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.query("ALTER TABLE `juese_jiekou` DROP FOREIGN KEY `FK_116025f8fab0b3ea6d9d375c7a8`");
        await queryRunner.query("ALTER TABLE `juese_jiekou` DROP FOREIGN KEY `FK_36af7d488f309c2f0ede5f22f43`");
        await queryRunner.query("ALTER TABLE `yonghu_juese` DROP FOREIGN KEY `FK_aef97e94e2f603e9acf298c0013`");
        await queryRunner.query("ALTER TABLE `yonghu_juese` DROP FOREIGN KEY `FK_35c5605df55d885dfd9467820e3`");
        await queryRunner.query("DROP INDEX `IDX_116025f8fab0b3ea6d9d375c7a` ON `juese_jiekou`");
        await queryRunner.query("DROP INDEX `IDX_36af7d488f309c2f0ede5f22f4` ON `juese_jiekou`");
        await queryRunner.query("DROP TABLE `juese_jiekou`");
        await queryRunner.query("DROP INDEX `IDX_aef97e94e2f603e9acf298c001` ON `yonghu_juese`");
        await queryRunner.query("DROP INDEX `IDX_35c5605df55d885dfd9467820e` ON `yonghu_juese`");
        await queryRunner.query("DROP TABLE `yonghu_juese`");
        await queryRunner.query("DROP INDEX `IDX_8be491adfcec3c9ae1bbdbbb8e` ON `jiekou`");
        await queryRunner.query("DROP TABLE `jiekou`");
        await queryRunner.query("DROP INDEX `IDX_991590b5a68db044c3ba69b2e7` ON `juese`");
        await queryRunner.query("DROP TABLE `juese`");
        await queryRunner.query("DROP INDEX `IDX_0f88154b5f237413835e3c9142` ON `yonghu`");
        await queryRunner.query("DROP TABLE `yonghu`");
        await queryRunner.query("DROP INDEX `IDX_c076ab9c16c8d98f914ec39ab3` ON `banben`");
        await queryRunner.query("DROP TABLE `banben`");
    }

    name = 'qiyishuju_1594564630876'

    public async up(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.query("CREATE TABLE `banben` (`id` int NOT NULL AUTO_INCREMENT, `banbenhao` varchar(255) NOT NULL, `shuoming` varchar(255) NULL, UNIQUE INDEX `IDX_c076ab9c16c8d98f914ec39ab3` (`banbenhao`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `yonghu` (`id` int NOT NULL AUTO_INCREMENT, `zhanghao` varchar(255) NOT NULL, `mima` varchar(255) NOT NULL, `jihuo` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX `IDX_0f88154b5f237413835e3c9142` (`zhanghao`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `juese` (`id` int NOT NULL AUTO_INCREMENT, `jihuo` tinyint NOT NULL DEFAULT 1, `mingcheng` varchar(255) NOT NULL, `shuoming` varchar(255) NOT NULL, UNIQUE INDEX `IDX_991590b5a68db044c3ba69b2e7` (`mingcheng`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `jiekou` (`id` int NOT NULL AUTO_INCREMENT, `method` varchar(255) NOT NULL, `url` varchar(255) NOT NULL, `fenzu` varchar(255) NOT NULL, `shuoming` varchar(255) NOT NULL, `qiyong` tinyint NOT NULL, `jianquan` varchar(255) NOT NULL, UNIQUE INDEX `IDX_8be491adfcec3c9ae1bbdbbb8e` (`url`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `yonghu_juese` (`yonghuId` int NOT NULL, `jueseId` int NOT NULL, INDEX `IDX_35c5605df55d885dfd9467820e` (`yonghuId`), INDEX `IDX_aef97e94e2f603e9acf298c001` (`jueseId`), PRIMARY KEY (`yonghuId`, `jueseId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `juese_jiekou` (`jueseId` int NOT NULL, `jiekouId` int NOT NULL, INDEX `IDX_36af7d488f309c2f0ede5f22f4` (`jueseId`), INDEX `IDX_116025f8fab0b3ea6d9d375c7a` (`jiekouId`), PRIMARY KEY (`jueseId`, `jiekouId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `yonghu_juese` ADD CONSTRAINT `FK_35c5605df55d885dfd9467820e3` FOREIGN KEY (`yonghuId`) REFERENCES `yonghu`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `yonghu_juese` ADD CONSTRAINT `FK_aef97e94e2f603e9acf298c0013` FOREIGN KEY (`jueseId`) REFERENCES `juese`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `juese_jiekou` ADD CONSTRAINT `FK_36af7d488f309c2f0ede5f22f43` FOREIGN KEY (`jueseId`) REFERENCES `juese`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `juese_jiekou` ADD CONSTRAINT `FK_116025f8fab0b3ea6d9d375c7a8` FOREIGN KEY (`jiekouId`) REFERENCES `jiekou`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

}
