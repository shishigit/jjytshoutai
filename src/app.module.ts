import { Module } from '@nestjs/common';
import { AppController } from './ctrl/app.controller';
import { AppService } from './serv/app.service';
import { CtrlXitong } from './ctrl/ctrl.xitong';

@Module({
  imports: [],
  controllers: [AppController, CtrlXitong],
  providers: [AppService],
})
export class AppModule
{
}
