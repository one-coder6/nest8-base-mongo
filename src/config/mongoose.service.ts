import { ConfigService } from './config.service';
import { Injectable, Logger } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createMongooseOptions(): MongooseModuleOptions {
    const target = [
      'mongo.host',
      'mongo.db',
      'mongo.username',
      'mongo.password',
    ];
    const [host, dbName, username, password] = this.configService.gets(target);
    const enableAccount = username && password;
    const url = enableAccount ? `${username}:${password}@${host}` : `${host}`;
    const db: MongooseModuleOptions = {
      uri: `mongodb://${url}/${dbName}`,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    Logger.warn(db.uri, '数据库连接地址');
    return db;
  }
}
