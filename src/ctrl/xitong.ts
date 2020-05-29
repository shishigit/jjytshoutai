import { Controller, Post } from '@nestjs/common';

@Controller('xitong')
export class Xitong
{
  @Post('denglu')
  getHello(): string
  {
    return '';
  }
}