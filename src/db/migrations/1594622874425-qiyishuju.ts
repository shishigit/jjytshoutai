import {MigrationInterface, QueryRunner} from "typeorm";

export class qiyishuju1594622874425 implements MigrationInterface
{
    public async down(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.query("ALTER TABLE `bumen_yonghu` DROP FOREIGN KEY `FK_c434ec6acbae48315d41c24062a`");
        await queryRunner.query("ALTER TABLE `bumen_yonghu` DROP FOREIGN KEY `FK_d3a71405eee60d0d5a550865439`");
        await queryRunner.query("DROP INDEX `IDX_c434ec6acbae48315d41c24062` ON `bumen_yonghu`");
        await queryRunner.query("DROP INDEX `IDX_d3a71405eee60d0d5a55086543` ON `bumen_yonghu`");
        await queryRunner.query("DROP TABLE `bumen_yonghu`");
        await queryRunner.query("DROP INDEX `IDX_831959a32c09856fe4eefaaaf9` ON `bumen`");
        await queryRunner.query("DROP TABLE `bumen`");
    }

    name = 'qiyishuju1594622874425'

    public async up(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.query("CREATE TABLE `bumen` (`id` int NOT NULL AUTO_INCREMENT, `beizhu` varchar(255) NOT NULL, `mingcheng` varchar(255) NOT NULL, UNIQUE INDEX `IDX_831959a32c09856fe4eefaaaf9` (`mingcheng`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `bumen_yonghu` (`bumenId` int NOT NULL, `yonghuId` int NOT NULL, INDEX `IDX_d3a71405eee60d0d5a55086543` (`bumenId`), INDEX `IDX_c434ec6acbae48315d41c24062` (`yonghuId`), PRIMARY KEY (`bumenId`, `yonghuId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `bumen_yonghu` ADD CONSTRAINT `FK_d3a71405eee60d0d5a550865439` FOREIGN KEY (`bumenId`) REFERENCES `bumen`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `bumen_yonghu` ADD CONSTRAINT `FK_c434ec6acbae48315d41c24062a` FOREIGN KEY (`yonghuId`) REFERENCES `yonghu`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

}
