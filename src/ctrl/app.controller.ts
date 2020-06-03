import { AppService } from '../serv/app.service';
import { JJYGet } from '../config/request-mapping.decorator';
import { JJYController } from '../config/controller.decorator';

@JJYController()
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
