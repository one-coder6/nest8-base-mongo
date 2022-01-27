import { Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/flow/filters/http.exception.filter';
import { AuthGuard } from 'src/flow/guard/auth.guard';
import { ServiceExceptionInterceptor } from 'src/flow/interceptor/service.exception.interceptor';
import { TransformInterceptor } from 'src/flow/interceptor/transform.interceptor';
import { GlobalMidWare } from 'src/flow/middlewares/global.middleware';
import { ApiParamsValidationPipe } from 'src/flow/pipe/api.params.validation.pipe';

const env = process.env.NODE_ENV;
global.isDev = env === 'development' || env === 'test'; // 开发环境或者开发环境连测试环境数据库
global.isProd = env === 'production'; // 生产环境

/**
 * 注册文档接口
 * @param app
 */
function registerSwagger(app) {
  const createSwagger = (app) => {
    const options = new DocumentBuilder()
      .setTitle('nest-monogo service nest doc')
      .setDescription('Api description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);
  };
  // 开发环境注册接口说明文档
  global.isDev && createSwagger(app);
  Logger.warn('http://localhost:4000/api-docs/#/', 'api-docs地址');
  // http://localhost:4000/api-docs/#/
}

/**
 * 注册一些请求流转方法
 * */
function registerFlowFn(app) {
  app.useGlobalFilters(new HttpExceptionFilter()); // 过滤器
  app.useGlobalInterceptors(new TransformInterceptor(new Reflector())); // 拦截器
  app.useGlobalInterceptors(new ServiceExceptionInterceptor()); // 拦截器
  app.useGlobalPipes(new ApiParamsValidationPipe()); // 管道
  app.useGlobalGuards(new AuthGuard(new Reflector())); // 守卫
  app.use(GlobalMidWare); // 中间件
}

export const Base = {
  install: (app) => {
    registerFlowFn(app);
    registerSwagger(app);
  },
};
