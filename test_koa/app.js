

//系统的Main过程
/*
新建koa对象
初始化配置
注册get post 请求逻辑
监听端口  开启服务

 */

const Koa = require('koa');
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const app = new Koa();
// 打印请求信息
app.use(async (ctx, next) => {
    console.log(`正在请求 ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});
app.use(cors()); //允许跨域

app.use(bodyParser());//注册body解析功能
app.use(controller());//调用controller.js中逻辑完成post get请求逻辑的注册
app.listen(3000);//监听3000端口  开启服务
console.log('服务已开启...');
console.log('端口: 3000...');
