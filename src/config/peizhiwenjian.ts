/******************************************************************************
 * 配置文件：整个系统的配置，用于配置开发环境和生产环境
 ******************************************************************************/
interface Peizhiwenjian
{
  // 开发环境？生产环境？
  kaifa: boolean,

  // 监听端口
  duankou: number
}

// 开发环境
const kaifahuanjing: Peizhiwenjian = {
  duankou: 3100,
  kaifa: true,
};

// 生产环境
// noinspection JSUnusedLocalSymbols
const shengchanhuanjing: Peizhiwenjian = {
  duankou: 3100,
  kaifa: false,
};

export const peizhiwenjian: Peizhiwenjian = kaifahuanjing;

