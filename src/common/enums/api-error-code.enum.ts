export enum ApiErrorCode {
  TimeOut = -1, // 系统繁忙

  Success = 1, // 成功

  Fail = 0, // 失败

  NotEmpty = 20000, // 不能为空

  IsNotDateTimeString = 20001, // 时间字符串格式错误

  IsNotBool = 20002, // 应该为bool类型

  IsNotObjectId = 20003, // 不是objectId字符串

  StringIsTooLong = 20004, // 字符过长

  ParamError = 20005, // 参数错误

  IsEmpty = 20006, // 查询到了空数据
}
