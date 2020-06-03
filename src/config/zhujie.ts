import { ControllerOptions, RequestMappingMetadata, RequestMethod } from '@nestjs/common';
import { HOST_METADATA, METHOD_METADATA, PATH_METADATA, SCOPE_OPTIONS_METADATA } from '@nestjs/common/constants';
import { isString, isUndefined } from '@nestjs/common/utils/shared.utils';

const PATH_SHUOMING = 'PATH_SHUOMING';

export function JJYController(prefixOrOptions: string | ControllerOptions, fenzu: string): ClassDecorator
{
  const defaultPath = '/';
  const [path, host, scopeOptions] = isUndefined(prefixOrOptions)
    ? [defaultPath, undefined, undefined]
    : isString(prefixOrOptions)
      ? [prefixOrOptions, undefined, undefined]
      : [
        prefixOrOptions.path || defaultPath,
        prefixOrOptions.host,
        { scope: prefixOrOptions.scope },
      ];

  return (target: object) =>
  {
    let yuanxin = Object.getOwnPropertyDescriptors((target as any).prototype);

    //todo

    for (const yuanxinKey in yuanxin)
    {
      console.log(yuanxinKey);
    }

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
