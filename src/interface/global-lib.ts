// 编写声明文件
declare global {
  namespace NodeJS {
    interface Global {
      isDev: boolean; // 开发环境
      isProd: boolean; // 生产环境
    }
  }
}

export {};
