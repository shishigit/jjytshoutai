import { ControllerOptions, RequestMappingMetadata, RequestMethod } from '@nestjs/common';
import { HOST_METADATA, METHOD_METADATA, PATH_METADATA, SCOPE_OPTIONS_METADATA } from '@nestjs/common/constants';
import { isString, isUndefined } from '@nestjs/common/utils/shared.utils';

export function JJYController(prefixOrOptions: string | ControllerOptions): ClassDecorator
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
): MethodDecorator
{
  const pathMetadata = metadata[PATH_METADATA];
  const path = pathMetadata && pathMetadata.length ? pathMetadata : '/';
  const requestMethod = metadata[METHOD_METADATA] || RequestMethod.GET;

  return (
    target: object,
    key: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) =>
  {
    Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
    Reflect.defineMetadata(METHOD_METADATA, requestMethod, descriptor.value);
    return descriptor;
  };
};

const createMappingDecorator = function(method: RequestMethod)
{
  return function(
    path?: string | string[],
  ): MethodDecorator
  {
    return RequestMapping({
      [PATH_METADATA]: path,
      [METHOD_METADATA]: method,
    });
  };
};

export const JJYPost = createMappingDecorator(RequestMethod.POST);
export const JJYGet = createMappingDecorator(RequestMethod.GET);
export const JJYAll = createMappingDecorator(RequestMethod.ALL);
