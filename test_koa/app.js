const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const app = new Koa();



const Sequelize = require('sequelize');

const config = require('./DB_config/config');


console.log('init sequelize...');

//建立对应数据库的  ORM
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

//建立一个 ORM 实体模型    学生登陆表
var Load = sequelize.define('load', {
    loadid: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    password: Sequelize.STRING(100)

}, {
    timestamps: false
});


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