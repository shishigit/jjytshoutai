import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { rizhi } from './config/rizhi';
import { peizhiwenjian } from './config/peizhiwenjian';
import { KaifaRizhi } from './config/qingqiurizhi';
import { HttpYichang, YichangXitongTuichu } from './config/yichang';
import { Shujukubanben } from './config/shujukubanben';
import { gengxinJiekou } from './config/zhujie';
import { Shouwei } from './config/shouwei';
import { redissession } from './config/redis.session';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap()
{
  const app = await NestFactory.create(AppModule, { logger: rizhi });

  if (peizhiwenjian.kaifa) app.useGlobalInterceptors(new KaifaRizhi());
  app.useGlobalFilters(new HttpYichang());
  app.useGlobalGuards(new Shouwei());
  app.use(redissession);

  await Shujukubanben.tongbushuju();
  await gengxinJiekou();

  const options = new DocumentBuilder()
    .setTitle('测试接口')
    .setDescription('测试接口')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(peizhiwenjian.duankou);
}

bootstrap()
  .then(() => rizhi.log('系统启动'))
  .catch(err =>
  {
    rizhi.error('系统异常');
    rizhi.error(err);
    if (err instanceof YichangXitongTuichu) process.exit();
  });
