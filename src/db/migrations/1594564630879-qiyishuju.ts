import {MigrationInterface, QueryRunner} from "typeorm";
import {SqlJuese} from "../sql/sql.juese";
import {SqlYonghu} from "../sql/sql.yonghu";
import {YichangXitongTuichu} from "../../config/yichang";

export class qiyishuju_1594564630876 implements MigrationInterface
{
    public async down(queryRunner: QueryRunner): Promise<void>
    {

    }

    name = 'qiyishuju_1594564630879'

    public async up(queryRunner: QueryRunner): Promise<void>
    {
        let admin = await SqlYonghu.findByZhanghao('admin');
        if (!admin) throw new YichangXitongTuichu('admin 账号不存在');


        let chaojiguanliyuan = await SqlJuese.findByMingcheng('超级管理员');
        if (!chaojiguanliyuan) throw new YichangXitongTuichu('超级管理员角色不存在');

        let jueses = await SqlJuese.findByYonghuId(admin.id);
        let yiguanlian = jueses.map(value => value.id).includes(chaojiguanliyuan.id);
        if (!yiguanlian)
        {
            jueses.push(chaojiguanliyuan);
            admin.jueses = jueses;
            await admin.save()
        }
    }
}
