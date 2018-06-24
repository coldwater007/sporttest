//整合所有路由
import Router from 'koa-router';
import api from './api';

const router =new Router();
router
	.get('/', async (ctx,next) => {
		await ctx.render('index.html');
	});
router.use('/api',api.routes(),api.allowedMethods())

export default router;