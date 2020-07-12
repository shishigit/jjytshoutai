import {MigrationInterface, QueryRunner} from "typeorm";

export class qiyishuju_1594564630876 implements MigrationInterface
{
    public async down(queryRunner: QueryRunner): Promise<void>
    {

    }

    name = 'qiyishuju_1594564630876'

    public async up(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.query(`
        
        `);
    }

}
