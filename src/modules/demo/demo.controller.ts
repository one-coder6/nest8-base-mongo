import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  Header,
  Headers,
  Req,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { DemoService } from './demo.service';
import { CreateDemoDto } from './dto/create-demo.dto';

@ApiTags('demo模块')
@Controller('demo')
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @Post('create')
  @HttpCode(200)
  @ApiHeader({
    name: 'access-token',
    required: true,
    description: '请求头需携带token',
    example: '546f9a99651c4d13b126f353048766b8',
  })
  create(@Body() createDemoDto: CreateDemoDto, @Req() req) {
    const ip = req.headers['user-agent'];
    const ua = req.socket.remoteAddress;
    return this.demoService.create(createDemoDto);
  }

  @ApiHeader({
    name: 'access-token',
    required: true,
    description: '请求头需携带token',
    example: '546f9a99651c4d13b126f353048766b8',
  })
  @Get('queryList')
  findAll(@Body() param) {
    return this.demoService.findAll(param);
  }

  @ApiHeader({
    name: 'access-token',
    required: true,
    description: '请求头需携带token',
    example: '546f9a99651c4d13b126f353048766b8',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.demoService.findOne(id);
  }

  @ApiHeader({
    name: 'access-token',
    required: true,
    description: '请求头需携带token',
    example: '546f9a99651c4d13b126f353048766b8',
  })
  @Post('update')
  update(@Body() updateDemoDto: CreateDemoDto) {
    return this.demoService.update(updateDemoDto);
  }

  @ApiHeader({
    name: 'access-token',
    required: true,
    description: '请求头需携带token',
    example: '546f9a99651c4d13b126f353048766b8',
  })
  @Get('delete/:id')
  remove(@Param('id') id: number | string) {
    return this.demoService.remove(id);
  }
}
