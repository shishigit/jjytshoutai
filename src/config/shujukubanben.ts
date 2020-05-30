import { Banben } from '../db/banben';
import { Yonghu } from '../db/yonghu';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';

async function v001(manager: EntityManager)
{
  let ls = await Yonghu.findByZhanghao('admin');
  if (!ls)
  {
    let yonghu = new Yonghu();
    yonghu.zhanghao = 'admin';
    yonghu.mima = 'mima';
    await manager.save(yonghu);
  }
}

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