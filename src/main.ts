import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { rizhi } from './config/rizhi';

async function bootstrap()
{
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap()
  .then(value => rizhi.info('系统启动'))
  .catch(reason => rizhi.info(('系统异常')));
