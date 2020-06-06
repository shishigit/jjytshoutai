import { Banben } from '../db/banben';
import { Yonghu } from '../db/yonghu';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import { Jiami } from './jiami';
import { YonghuSql } from '../db/yonghu.sql';
import { JueseSql } from '../db/juese.sql';
import { Juese } from '../db/juese';
import { rizhi } from './rizhi';

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

async function v002(manager: EntityManager)
{
  let chaojiguanliyuan = await JueseSql.findByMingcheng('超级管理员');
  if (!chaojiguanliyuan)
  {
    let chaojiguanliyuan = new Juese();
    chaojiguanliyuan.mingcheng = '超级管理员';
    chaojiguanliyuan.shuoming = '系统超级管理员';
    await manager.save(chaojiguanliyuan);
  }
}

async function v003(manager: EntityManager)
{
  let admin = await YonghuSql.findByZhanghao('admin');
  if (!admin)
  {
    rizhi.error('admin 账号不存在');
    process.exit();
  }

  let chaojiguanliyuan = await JueseSql.findByMingcheng('超级管理员');
  if (!chaojiguanliyuan)
  {
    rizhi.error('超级管理员角色不存在');
    process.exit();
  }

  let jueses = await admin.jueses;
  let yiguanlian = jueses.map(value => value.id).includes(chaojiguanliyuan.id);
  if (!yiguanlian)
  {
    jueses.push(chaojiguanliyuan);
    await manager.save(admin);
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
    await Shujukubanben.zhixing(v002, '添加超级管理员角色', manager);
    await Shujukubanben.zhixing(v003, 'admin 关联超级管理员角色', manager);
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