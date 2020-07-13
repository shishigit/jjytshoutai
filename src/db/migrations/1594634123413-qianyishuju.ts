import {MigrationInterface, QueryRunner} from "typeorm";

export class qianyishuju1594634123413 implements MigrationInterface
{
    public async down(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.query("DROP INDEX `IDX_c076ab9c16c8d98f914ec39ab3` ON `banben`");
        await queryRunner.query("DROP TABLE `banben`");
    }

    name = 'qianyishuju1594634123413'

    public async up(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.query("CREATE TABLE `banben` (`id` int NOT NULL AUTO_INCREMENT, `banbenhao` varchar(255) NOT NULL, `shuoming` varchar(255) NULL, UNIQUE INDEX `IDX_c076ab9c16c8d98f914ec39ab3` (`banbenhao`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

}
