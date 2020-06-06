import { RequestMappingMetadata, RequestMethod } from '@nestjs/common';
import { HOST_METADATA, METHOD_METADATA, PATH_METADATA, SCOPE_OPTIONS_METADATA } from '@nestjs/common/constants';
import { Jiekou } from '../db/jiekou';
import { rizhi } from './rizhi';
import { JiekouSql } from '../db/jiekou.sql';
import { JianQuanLeixing } from './changliang';
import { JueseSql } from '../db/juese.sql';

const PATH_SHUOMING = 'PATH_SHUOMING';
const PATH_JIANQUAN = 'PATH_JIANQUAN';

/**
 * 系统当前包含的所有接口，不含已经废除的接口
 */
const suoyouJiekou: Jiekou[] = [];

/**
 * 更新数据库中的接口记录
 */
export async function gengxinJiekou()
{
  await Jiekou.update({ qiyong: true }, { qiyong: false });

  for (const jiekou of suoyouJiekou)
  {
    if (await JiekouSql.existByUrl(jiekou.url))
      await JiekouSql.updateByUrl(jiekou);
    else
      await jiekou.save();
  }

  // 更新超级管理员接口
  let qiyongjiekou = await JiekouSql.findByQiyong(true);
  let chaojiguanliyuan = await JueseSql.findByMingcheng('超级管理员');
  if (!chaojiguanliyuan)
  {
    rizhi.error('超级管理员角色不存在');
    process.exit();
  }

  let chaojijiekou = await chaojiguanliyuan.jiekous;
  chaojijiekou = qiyongjiekou;
  await chaojiguanliyuan.save();
}

/**
 * Contrller注解
 * @param prefixOrOptions URL
 * @param fenzu 请求分组
 */
export function JJYController(prefixOrOptions: string, fenzu: string): ClassDecorator
{
  const [path, host, scopeOptions] = [prefixOrOptions, undefined, undefined];

  return (target: object) =>
  {
    Object
      .getOwnPropertyNames((target as any).prototype)
      .map(value => (target as any).prototype[value])
      .filter(value => (value as any) instanceof Function)
      .filter(value => Reflect.hasMetadata(PATH_SHUOMING, value))
      .forEach(value =>
      {
        let url = `/${path}/${Reflect.getMetadata(PATH_METADATA, value)}`;
        if (url.includes('//'))
        {
          rizhi.error(`错误的URL：${url}`);
          process.exit(0);
        }

        let jiekou = new Jiekou(
          url,
          Reflect.getMetadata(METHOD_METADATA, value) as RequestMethod,
          fenzu,
          Reflect.getMetadata(PATH_SHUOMING, value),
          true,
          Reflect.getMetadata(PATH_JIANQUAN, value),
        );
        suoyouJiekou.push(jiekou);
      });

    Reflect.defineMetadata(PATH_METADATA, path, target);
    Reflect.defineMetadata(HOST_METADATA, host, target);
    Reflect.defineMetadata(SCOPE_OPTIONS_METADATA, scopeOptions, target);
  };
}

const RequestMapping = function(
  metadata: RequestMappingMetadata =
    {
      [PATH_METADATA]: '/',
      [METHOD_METADATA]: RequestMethod.GET,
    },
  path_shuoming: string,
  path_jianquan: JianQuanLeixing,
): MethodDecorator
{
  const pathMetadata = metadata[PATH_METADATA];
  const path = pathMetadata && pathMetadata.length ? pathMetadata : '/';
  const requestMethod = metadata[METHOD_METADATA] || RequestMethod.GET;

  return function(target: object, key: string | symbol, descriptor: TypedPropertyDescriptor<any>)
  {
    Reflect.defineMetadata(PATH_SHUOMING, path_shuoming, descriptor.value);
    Reflect.defineMetadata(PATH_JIANQUAN, path_jianquan, descriptor.value);
    Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
    Reflect.defineMetadata(METHOD_METADATA, requestMethod, descriptor.value);
    return descriptor;
  };
};

const createMappingDecorator = function(method: RequestMethod)
{
  return function(path: string, path_shuoming: string, path_jianquan: JianQuanLeixing): MethodDecorator
  {
    return RequestMapping({
      [PATH_METADATA]: path,
      [METHOD_METADATA]: method,
    }, path_shuoming, path_jianquan);
  };
};

export const JJYPost = createMappingDecorator(RequestMethod.POST);
// noinspection JSUnusedGlobalSymbols
export const JJYGet = createMappingDecorator(RequestMethod.GET);
// noinspection JSUnusedGlobalSymbols
export const JJYAll = createMappingDecorator(RequestMethod.ALL);
