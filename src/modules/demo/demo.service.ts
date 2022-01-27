import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { ApiException } from 'src/flow/filters/api.exception';
import { CreateDemoDto } from './dto/create-demo.dto';
import { Demo } from './entities/demo.entity';
import { FindAllParams } from './interface';

@Injectable()
export class DemoService {
  constructor(
    @InjectModel(Demo.name)
    private readonly demoModel: Model<Demo>,
  ) {}

  create(createDemoDto: CreateDemoDto) {
    const creater = new this.demoModel(createDemoDto);
    return creater.save();
  }

  async findAll(param: FindAllParams) {
    const { pageSize = 10, pageIndex, keyword = '' } = param;
    const _pageSize = +pageSize,
      _pageIndex = +pageIndex;
    const sort = { createTime: -1 }; // 排序
    const query = keyword ? { title: { $regex: keyword } } : {};
    const totalCount = await this.demoModel.countDocuments(query);
    const pageData = await this.demoModel
      .find(query)
      .skip(_pageSize * ((_pageIndex || 1) - 1))
      .limit(_pageSize)
      .sort(sort);
    return {
      totalCount,
      pageData,
    };
  }

  findOne(id: number | string) {
    return this.demoModel.findById(id);
  }

  async update(updateDemoDto: CreateDemoDto) {
    const _id = updateDemoDto.id;
    const thisOne = await this.demoModel.findOne({ _id });
    if (thisOne) {
      Object.assign(thisOne, updateDemoDto);
      return new this.demoModel(thisOne).save();
    } else {
      throw new ApiException(
        '更新失败，没有找到这条记录',
        ApiErrorCode.IsEmpty,
        HttpStatus.OK,
      );
    }
  }

  async remove(_id: number | string) {
    const thisOne = await this.demoModel.findOne({ _id });
    if (thisOne) {
      const { ok } = await this.demoModel.deleteOne({ _id });
      return !!ok;
    } else {
      throw new ApiException(
        '删除失败，没有找到这条记录',
        ApiErrorCode.IsEmpty,
        HttpStatus.OK,
      );
    }
  }
}
