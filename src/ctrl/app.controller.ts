import { Controller } from '@nestjs/common';
import { AppService } from '../serv/app.service';
import { JJYGet } from '../config/request-mapping.decorator';

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
