import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';

export class Car {
  @ApiProperty({ title: '名字', example: '布加迪' })
  @MaxLength(50)
  @IsNotEmpty()
  @IsOptional()
  readonly name: string;

  @ApiProperty({ title: '颜色', example: '黑色' })
  readonly color: string;

  @ApiProperty({ title: '价格', example: 1000000 })
  @IsNumber()
  @IsOptional()
  readonly price: number;
}
