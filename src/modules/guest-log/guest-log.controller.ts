import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpCode,
  Query,
} from '@nestjs/common';
import { GuestLogService } from './guest-log.service';
import { CreateGuestLogDto } from './dto/create-guest-log.dto';
import { UpdateGuestLogDto } from './dto/update-guest-log.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('guest-log')
@Controller('guest-log')
export class GuestLogController {
  constructor(private readonly guestLogService: GuestLogService) {}

  @Post('create')
  @HttpCode(200)
  @ApiHeader({
    name: 'access-token',
    required: true,
    description: '请求头需携带token',
    example: '546f9a99651c4d13b126f353048766b8',
  })
  create(@Body() createGuestLogDto: CreateGuestLogDto, @Req() req) {
    // 如果这个ip在1分钟内发送超过10次请求就拦截
    // 如果这个ip在1天内发送了100次请求就拦截
    const ua = req.headers['user-agent'];
    const ip = req.socket.remoteAddress;
    return this.guestLogService.create({ ...createGuestLogDto, ip, ua });
  }

  @ApiHeader({
    name: 'access-token',
    required: true,
    description: '请求头需携带token',
    example: '546f9a99651c4d13b126f353048766b8',
  })
  @Get('queryList')
  findAll(@Query() query) {
    return this.guestLogService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guestLogService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGuestLogDto: UpdateGuestLogDto,
  ) {
    return this.guestLogService.update(+id, updateGuestLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guestLogService.remove(+id);
  }
}
