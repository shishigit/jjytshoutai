import { RequestMappingMetadata, RequestMethod } from '@nestjs/common';
import { HOST_METADATA, METHOD_METADATA, PATH_METADATA, SCOPE_OPTIONS_METADATA } from '@nestjs/common/constants';
import { Jiekou } from '../db/jiekou';
import { rizhi } from './rizhi';

const PATH_SHUOMING = 'PATH_SHUOMING';

const suoyouJiekou: Jiekou[] = [];

export async function gengxinJiekou()
{
  await Jiekou.update({ qiyong: true }, { qiyong: false });

  for (const jiekou of suoyouJiekou)
  {
    if (await Jiekou.existByUrl(jiekou.url))
      await Jiekou.updateByUrl(jiekou);
    else
      await jiekou.save();
  }
}

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
    }, path_shuoming: string,
): MethodDecorator
{
  const pathMetadata = metadata[PATH_METADATA];
  const path = pathMetadata && pathMetadata.length ? pathMetadata : '/';
  const requestMethod = metadata[METHOD_METADATA] || RequestMethod.GET;

  return function(target: object, key: string | symbol, descriptor: TypedPropertyDescriptor<any>)
  {
    Reflect.defineMetadata(PATH_SHUOMING, path_shuoming, descriptor.value);
    Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
    Reflect.defineMetadata(METHOD_METADATA, requestMethod, descriptor.value);
    return descriptor;
  };
};

const createMappingDecorator = function(method: RequestMethod)
{
  return function(path: string, path_shuoming: string): MethodDecorator
  {
    return RequestMapping({
      [PATH_METADATA]: path,
      [METHOD_METADATA]: method,
    }, path_shuoming);
  };
};

export const JJYPost = createMappingDecorator(RequestMethod.POST);
// noinspection JSUnusedGlobalSymbols
export const JJYGet = createMappingDecorator(RequestMethod.GET);
// noinspection JSUnusedGlobalSymbols
export const JJYAll = createMappingDecorator(RequestMethod.ALL);
