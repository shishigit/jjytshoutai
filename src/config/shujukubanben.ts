import { Banben } from '../db/banben';
import { YonghuService } from '../db/yonghu.service';
import { Yonghu } from '../db/yonghu';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';

async function v001(manager: EntityManager, st: string)
{
  let ls = await YonghuService.findByZhanghao('admin');
  if (!ls)
  {
    let yonghu = new Yonghu();
    yonghu.zhanghao = 'admin';
    yonghu.mima = 'mima';
    await manager.save(yonghu);
  }
}

async function zhixing(func: (manager: EntityManager) => void, shuoming: string, manager: EntityManager)
{
  let yiyou = await Banben.findOne({ where: { banbenhao: func.name } });
  // todo zheli xuyaoshiwu
  if (!yiyou)
  {
    func.call(manager);
    let banben = new Banben();
    banben.banbenhao = func.name;
    banben.shuoming = shuoming;
    await manager.save(banben);
  }
}

@Transaction()
export async function shujukubanben(@TransactionManager() manager: EntityManager)
{
  await zhixing(v001, '添加系统管理员', manager);
}