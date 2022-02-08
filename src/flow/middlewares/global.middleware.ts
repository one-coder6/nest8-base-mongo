export function GlobalMidWare(req, res, next) {
  // 可以做一些事情...
  // 如果这个ip在1分钟内发送超过10次请求就拦截
  // 如果这个ip在1天内发送了100次请求就拦截
  next();
}
