import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './interface/global-lib';
import { Base } from './base/base';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  Base.install(app);
  await app.listen(3000);
  Logger.warn(`http://localhost:3000`, 'nestjs服务地址');
}
bootstrap();
