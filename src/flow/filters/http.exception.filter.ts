import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ApiException } from './api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response.header('Content-Type', 'application/json;charset=utf-8');
    const ret = {
      resultMsg: null,
      resultCode: null,
    };
    response.status(200); // 设置响应状态码为200
    if (exception instanceof ApiException) {
      ret.resultCode = exception.getErrorCode();
      ret.resultMsg = exception.getErrorMessage();
    } else {
      ret.resultCode = ApiErrorCode.Fail;
      ret.resultMsg = exception.message;
    }
    console.log(`[code:${ret.resultCode},contenx:${ret.resultMsg}]`);
    response.send(ret);
  }
}
