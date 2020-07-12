import {MigrationInterface, QueryRunner} from "typeorm";
import {SqlJuese} from "../sql/sql.juese";
import {Juese} from "../entities/juese";

export class qiyishuju_1594564630876 implements MigrationInterface
{
    public async down(queryRunner: QueryRunner): Promise<void>
    {

    }

    name = 'qiyishuju_1594564630878'

    public async up(queryRunner: QueryRunner): Promise<void>
    {
        let chaojiguanliyuan = await SqlJuese.findByMingcheng('超级管理员');
        if (!chaojiguanliyuan)
        {
            let chaojiguanliyuan = new Juese();
            chaojiguanliyuan.mingcheng = '超级管理员';
            chaojiguanliyuan.shuoming = '系统超级管理员';
            await chaojiguanliyuan.save()
        }
    }
}
