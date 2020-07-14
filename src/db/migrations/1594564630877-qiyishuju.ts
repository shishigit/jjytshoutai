import {MigrationInterface, QueryRunner} from "typeorm";
import {SqlYonghu} from "../sql/sql.yonghu";
import {Yonghu} from "../entities/yonghu";
import {jiami} from "../../config/gongju";

export class qiyishuju_1594564630876 implements MigrationInterface
{
    public async down(queryRunner: QueryRunner): Promise<void>
    {

    }

    name = 'qiyishuju_1594564630877'

    public async up(queryRunner: QueryRunner): Promise<void>
    {
        let ls = await SqlYonghu.findByZhanghao('admin');
        if (!ls)
        {
            let yonghu = new Yonghu();
            yonghu.zhanghao = 'admin';
            yonghu.mima = jiami.jiami('mima');
            await yonghu.save()
        }
    }
}
