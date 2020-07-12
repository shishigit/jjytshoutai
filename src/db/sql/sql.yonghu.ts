import {Yonghu} from '../entities/yonghu';
import {Like} from "typeorm";

export class SqlYonghu
{
    static findByZhanghao(zhanghao: string): Promise<Yonghu>
    {
        return Yonghu.findOne({where: {zhanghao}});
    }

    static findAndCountLike(zhanghao: string)
    {
        return Yonghu.findAndCount({where: {zhanghao: Like(`%${zhanghao}%`)}})
    }

    static findById(id: number)
    {
        return Yonghu.findOne({id})
    }

    static async deleteById(id: number)
    {
        return Yonghu.delete({id: id})
    }

    static shanchujuese(yonghuid: number, jueseid: number)
    {
        return Yonghu.query(`
                    delete
                    from yonghu_juese
                    where jueseId = ?
                      and yonghuId = ?`,
            [jueseid, yonghuid])
    }

    static tianjiajuese(yonghuid: number, jueseid: number)
    {
        return Yonghu.query(`
                    insert into yonghu_juese(yonghuId, jueseId) value (?, ?)
            `,
            [yonghuid, jueseid])
    }
}
