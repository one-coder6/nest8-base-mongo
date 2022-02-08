import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGuestLogDto } from './dto/create-guest-log.dto';
import { UpdateGuestLogDto } from './dto/update-guest-log.dto';
import { GuestLog } from './entities/guest-log.entity';
import { FindAllParams } from './interface';

@Injectable()
export class GuestLogService {
  constructor(
    @InjectModel(GuestLog.name)
    private readonly guestLogModel: Model<GuestLog>,
  ) {}

  async create(createGuestLogDto: CreateGuestLogDto) {
    // 如果这个ip在1分钟内发送超过10次请求就拦截
    // 如果这个ip在1天内发送了100次请求就拦截
    // const count = this.guestLogModel.countDocuments();
    const creater = new this.guestLogModel(createGuestLogDto);
    const ret = await creater.save();
    return ret._id ? 'success' : 'false';
  }

  async findAll(param: FindAllParams) {
    const { pageSize = 10, pageIndex, keyword = '' } = param;
    const _pageSize = +pageSize,
      _pageIndex = +pageIndex;
    const sort = { createTime: -1 }; // 排序
    const query = keyword ? { title: { $regex: keyword } } : {};
    const totalCount = await this.guestLogModel.countDocuments(query);
    const pageData = await this.guestLogModel
      .find(query)
      .skip(_pageSize * ((_pageIndex || 1) - 1))
      .limit(_pageSize)
      .sort(sort);
    return {
      totalCount,
      pageData,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} guestLog`;
  }

  update(id: number, updateGuestLogDto: UpdateGuestLogDto) {
    return `This action updates a #${id} guestLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} guestLog`;
  }
}
