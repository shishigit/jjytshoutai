import { Banben } from '../db/banben';
import { Yonghu } from '../db/yonghu';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import { Jiami } from './jiami';
import { YonghuSql } from '../db/yonghu.sql';

async function v001(manager: EntityManager)
{
  let ls = await YonghuSql.findByZhanghao('admin');
  if (!ls)
  {
    let yonghu = new Yonghu();
    yonghu.zhanghao = 'admin';
    yonghu.mima = Jiami.jiami('mima');
    await manager.save(yonghu);
  }
}

/**
 * 数据库版本
 */
export class Shujukubanben
{
  @Transaction()
  static async tongbushuju(@TransactionManager() manager?: EntityManager)
  {
    await Shujukubanben.zhixing(v001, '添加系统管理员', manager);
  }

  static async zhixing(func: (manager: EntityManager) => Promise<any>, shuoming: string, manager: EntityManager)
  {
    let yiyou = await Banben.findOne({ where: { banbenhao: func.name } });
    if (!yiyou)
    {
      await func(manager);
      let banben = new Banben();
      banben.banbenhao = func.name;
      banben.shuoming = shuoming;
      await manager.save(banben);
    }
  }
}