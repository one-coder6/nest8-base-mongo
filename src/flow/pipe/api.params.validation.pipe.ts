import {
  ArgumentMetadata,
  PipeTransform,
  Injectable,
  HttpStatus,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ApiException } from 'src/flow/filters/api.exception';

@Injectable()
export class ApiParamsValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length) {
      const error = errors.shift();
      const constraints = error.constraints;
      // const contexts = error.contexts || {};
      const status = HttpStatus.BAD_REQUEST;
      if (constraints) {
        const errStr = Object.values(constraints).join();
        throw new ApiException(errStr, 0, status);
      } else {
        // 属性为对象的，且该对象需要验证
        if (error.children && error.children.length) {
          const firstError = error.children.shift();
          if (firstError.constraints) {
            const errStr = Object.values(firstError.constraints).join();
            throw new ApiException(
              `${error.property} Error [${errStr}]`,
              0,
              status,
            );
          }
        } else {
          throw new ApiException(`${error.property} error`, 0, status);
        }
      }
    }
    return Object.assign(value, object);
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}
