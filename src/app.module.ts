import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { MongooseConfigService } from './config/mongoose.service';
import { CommonMiddleware } from './flow/middlewares/common.middleware';
import { DemoModule } from './modules/demo/demo.module';
import { TestModule } from './modules/test/test.module';
import { GuestLogModule } from './modules/guest-log/guest-log.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: MongooseConfigService,
    }),
    DemoModule,
    TestModule,
    GuestLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CommonMiddleware).forRoutes('/');
  }
}
