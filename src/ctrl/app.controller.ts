import { Controller } from '@nestjs/common';
import { AppService } from '../serv/app.service';
import { JJYGet } from '../config/zhujie';

@Controller()
export class AppController
{
  constructor(private readonly appService: AppService)
  {
  }

  @JJYGet()
  getHello(): string
  {
    return this.appService.getHello();
  }
}
