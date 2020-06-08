interface Houtaijiekou
{
  fenzu: string,
  url: string,
  canshu: object,
  fanhui: object,
}

namespace jiekou
{
  export const xitong_denglu: Houtaijiekou = {
    fenzu: 'xitong',
    url: 'denglu',
    canshu: {
      zhanghao: '',
      mima: '',
    },
    fanhui: [],
  };

}

export type fenzu11 = keyof Houtaijiekou;