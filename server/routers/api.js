import Router from 'koa-router';
import DataApi from '../control/dataAPi';
import AdminApi from '../control/adminApi';

const router = new Router();

export default router
	.post('/consumer',DataApi.addConsumer)
	.post('/well',DataApi.addWell)
	.post('/record',DataApi.addWellRecord)
	.post('/exploit',DataApi.addExploit)
	.post('/apply',DataApi.applyWater)
	.post('/login',DataApi.login)
	.post('/meter',DataApi.alterWell)
	.post('/register',AdminApi.registerUser)
	.get('/test', DataApi.test)
	.get('/well',DataApi.getWell)
	.get('/fee',DataApi.getFee)
	.put('/fee',DataApi.caculFee)
	.put('/apply',DataApi.alertLc)
	.get('/history',DataApi.gethistory)
	.get('/apply',DataApi.getAppMes)
	.get('/uapp',DataApi.getUapp)
	.get('/auser',DataApi.getUsers)
	.get('/afee',DataApi.getAllFee)
	.get('/exploit',AdminApi.getPrice)