import { Module } from '@nestjs/common';
import { AppController } from './ctrl/app.controller';
import { AppService } from './serv/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule
{
}
