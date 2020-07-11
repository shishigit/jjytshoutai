import {Yonghu} from './yonghu';
import {Like} from "typeorm";

export class YonghuSql
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
}
