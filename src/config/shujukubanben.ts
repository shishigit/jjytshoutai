import {Banben} from '../db/banben';
import {Yonghu} from '../db/yonghu';
import {EntityManager, Transaction, TransactionManager} from 'typeorm';
import {YonghuSql} from '../db/yonghu.sql';
import {JueseSql} from '../db/juese.sql';
import {Juese} from '../db/juese';
import {YichangXitongTuichu} from './yichang';
import {jiami} from "./gongju";

async function v001(manager: EntityManager)
{
  let ls = await YonghuSql.findByZhanghao('admin');
  if (!ls)
  {
    let yonghu = new Yonghu();
    yonghu.zhanghao = 'admin';
    yonghu.mima = jiami.jiami('mima');
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
  if (!admin) throw new YichangXitongTuichu('admin 账号不存在');


  let chaojiguanliyuan = await JueseSql.findByMingcheng('超级管理员');
  if (!chaojiguanliyuan) throw new YichangXitongTuichu('超级管理员角色不存在');

  let jueses = await JueseSql.findByYonghuId(admin.id);
  let yiguanlian = jueses.map(value => value.id).includes(chaojiguanliyuan.id);
  if (!yiguanlian)
  {
    jueses.push(chaojiguanliyuan);
    admin.jueses = jueses;
    await manager.save(admin);
  }
}

/**
 * 数据库版本
 */
export class Shujukubanben
{
  static async tongbushuju()
  {
    await Shujukubanben.zhixing(v001, '添加系统管理员');
    await Shujukubanben.zhixing(v002, '添加超级管理员角色');
    await Shujukubanben.zhixing(v003, 'admin 关联超级管理员角色');
  }

  @Transaction()
  static async zhixing(func: (manager: EntityManager) => Promise<any>, shuoming: string, @TransactionManager() manager?: EntityManager)
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
