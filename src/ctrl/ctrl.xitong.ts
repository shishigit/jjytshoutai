import { Body, Controller, Post } from '@nestjs/common';
import { YichangTishi } from '../config/yichang';

@Controller('xitong')
export class CtrlXitong
{
  @Post('denglu')
  denglu(
    @Body('zhanghao') zhanghao: string,
    @Body('mima')mima: string,
  )
  {
    if (!zhanghao) throw  new YichangTishi('账号不能为空');
    if (!mima) throw  new YichangTishi('密码不能为空');
    return '';
  }
}