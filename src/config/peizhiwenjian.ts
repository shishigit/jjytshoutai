/******************************************************************************
 * 配置文件：整个系统的配置，用于配置开发环境和生产环境
 ******************************************************************************/
interface Peizhiwenjian
{
  // 开发环境？生产环境？
  kaifa: boolean,
}

// 开发环境
const kaifahuanjing: Peizhiwenjian = {
  kaifa: true,
};

// 生产环境
// noinspection JSUnusedLocalSymbols
const shengchanhuanjing: Peizhiwenjian = {
  kaifa: false,
};

export const peizhiwenjian: Peizhiwenjian = kaifahuanjing;

