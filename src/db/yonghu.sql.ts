import {Yonghu} from './yonghu';

export class YonghuSql
{
    static findByZhanghao(zhanghao: string): Promise<Yonghu>
    {
        return Yonghu.findOne({where: {zhanghao}});
    }

    static findAndCount()
    {
        return Yonghu.findAndCount()
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
