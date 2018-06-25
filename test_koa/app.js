const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const app = new Koa();

//const load=require('./DB_model/model');


// 打印请求信息
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// 可以解析post请求
app.use(bodyParser());

// 使用controller中提供的逻辑
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');