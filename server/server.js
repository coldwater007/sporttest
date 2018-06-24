import Koa from 'koa';
import views from 'koa-views';
import path from 'path';
import koaStatic from 'koa-static';
import bodyParser from 'koa-bodyparser';
import koaLogger from 'koa-logger';
import {insertTIme} from './control/testApi';

//引用路由实例
import routers from './routers/index.js';

const app = new Koa();

app.use(koaLogger());
app.use(bodyParser());
app.use(koaStatic(path.join(__dirname, '../views')));
app.use(views(path.join(__dirname,'../views'),{extensions:'html'}));

app
	.use(routers.routes())


app.listen(3002)
console.log('[demo] start-quick is starting at port 3002')


