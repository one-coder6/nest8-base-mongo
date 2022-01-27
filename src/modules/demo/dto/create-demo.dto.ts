import { plainToClass, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayContains,
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsNotEmpty,
  isObject,
  IsOptional,
  Max,
  MaxLength,
  Min,
  registerDecorator,
  validate,
  ValidateNested,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { Car } from './car';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { ApiException } from 'src/flow/filters/api.exception';
import { HttpCode, HttpStatus } from '@nestjs/common';

export class CreateDemoDto {
  readonly id: string;
  @ApiProperty({ title: '名称', example: '艾莉瑞尔' })
  @MaxLength(50)
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ title: '性别', example: 0 })
  @IsIn([1, 0])
  readonly sex: number;

  @ApiProperty({ title: '年龄', example: 18 })
  @Min(1)
  @Max(150)
  @IsOptional()
  readonly age: number;

  @ApiProperty({ title: '标签', examples: ['流行', '摇滚'] })
  readonly tags: string[];

  @ApiProperty({ title: '备注', example: '备注文字...' })
  @MaxLength(200)
  @IsOptional()
  readonly remark: string;

  // 可以为空
  // 不为空情况下会进行校验
  @ValidateNested()
  @Type(() => Car)
  readonly myCar: Car;

  // 可以为空
  // 不为空情况下会进行校验
  @IsArray()
  @ValidateNested()
  @Type(() => Car)
  @IsOptional()
  readonly myCars: Car[];
}
