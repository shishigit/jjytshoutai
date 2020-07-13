import {MigrationInterface, QueryRunner} from "typeorm";

export class qiyishuju1594633597537 implements MigrationInterface
{
    public async down(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.query("ALTER TABLE `bumen` CHANGE `mingcheng` `mingcheng` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `bumen` CHANGE `beizhu` `beizhu` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `yonghu` CHANGE `mima` `mima` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `yonghu` CHANGE `zhanghao` `zhanghao` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `juese` CHANGE `shuoming` `shuoming` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `juese` CHANGE `mingcheng` `mingcheng` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `banben` CHANGE `shuoming` `shuoming` varchar(255) NULL");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_831959a32c09856fe4eefaaaf9` ON `bumen` (`mingcheng`)");
    }

    name = 'qiyishuju1594633597537'

    public async up(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.query("DROP INDEX `IDX_831959a32c09856fe4eefaaaf9` ON `bumen`");
        await queryRunner.query("ALTER TABLE `banben` CHANGE `shuoming` `shuoming` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `juese` CHANGE `mingcheng` `mingcheng` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `juese` CHANGE `shuoming` `shuoming` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `yonghu` CHANGE `zhanghao` `zhanghao` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `yonghu` CHANGE `mima` `mima` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `bumen` CHANGE `beizhu` `beizhu` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `bumen` CHANGE `mingcheng` `mingcheng` varchar(255) NOT NULL");
    }
}
