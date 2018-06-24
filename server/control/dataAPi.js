import * as models from '../models/models';
import {LicenceNumber,setAppTable,getNow,getMonth} from '../util/util';
import {getWellMon, getWaterFee, gethistory,
		getAppname,getUserApp,getWaterMeter,
		getFee,getWaterfee,
		getAllconsumer,getAllWell,getAllFee,
		getOneFee} from '../util/sql';
import Bignum from 'big.js';

/**
 *通过水井id,和用水量计算
 *
 */
async function caculWater(message) {
	const {wellid,amount} = message;

	const waterLic = await models.Waterlicence.findOne({where:{wellid:wellid}});

	const waterType = await models.Exploittype.findOne({where:{gid:waterLic.exploitid}});
	//计算
	const fee = amount * waterType.unitprice;
	//插入数据
	const insertObj = {
		licenceid:waterLic.licencenumber,
		consumerid:waterLic.consumerid,
		wellid:wellid,
		amount:amount,
		exploitid:waterLic.exploitid,
		totalfee:fee
	}
	const insertR = await models.WaterFee.create(insertObj);
}

//获取没有Licence则自动增加
async function addLicence(consumer) {
	const result = await models.Waterlicence.create({
		licencenumber:LicenceNumber(consumer),
		consumerid:consumer,
		extype_1:0,
		extype_2:0,
		extype_3:0,
		extype_4:0,
		extype_5:0,
		extype_6:0,
		state:0
	})

	return result;
}

async function IsAlert(consumer,time) {
	const result = await models.raw.query(getOneFee(consumer,time));
	if(result[0].length === 0){
		return null;
	}else {
		return result[0]
	}
	
}
export default {
	async addConsumer(ctx){
		const inputData = ctx.request.body;

		const result = await models.Consumer.create(inputData);
		ctx.body={data:result,code:1};
	},
	/**
	 *添加水井 有一个外键是 用户id
	 */
	async addWell(ctx){
		const inputData = ctx.request.body;
		const result = await models.Well.create(inputData);
		ctx.body={data:result,code:1};
	},
	/**
	 *添加水表记录 外键是水井
	 */
	async addWellRecord(ctx){
		const inputData = ctx.request.body;
		inputData.recordtime = new Date();
		const result = await models.watermeter.create(inputData);
		ctx.body={data:result,code:1};
		caculWater({wellid:inputData.waterid,amount:inputData.amount});
	},
	/**
	 * 添加取水用途
	 * @returns {Promise<void>}
	 */
	async addExploit(ctx){
		const inputData = ctx.request.body;
		const result = await  models.Exploittype.create(inputData);
		ctx.body = {data:result,code:1};
	},
	/**
	 * 申请用水许可
	 * 生成用水许可证编号
	 * 首先插入取水用途表获取id,
	 */
	async applyWater(ctx){
		const inputData = ctx.request.body;
		const result1 = await models.Wateruse.create({name:inputData.wateruse});
		inputData.waterid = result1.gid;
		inputData.licencenumber = LicenceNumber(result1.gid)
		inputData.state = 1; //表示申请已成功提交正在审核
		const result2 = await models.Waterlicence.create(inputData)
		ctx.body = {data:result2,code:1};

	},
	/**
	 * 获取当前的水井信息
	 * @returns {Promise<void>}
	 */
	async getWell(ctx){
		const queryData = ctx.query;
		if(queryData.date == "now"){
			queryData.date = getNow()
		}

		const wellResult = await models.raw.query(getWellMon(queryData.id,queryData.date));

		ctx.body = {data:wellResult[0],code:1};
	},
	async alterWell(ctx){
		const inputData = ctx.request.body;
		const {month,wellid,amount,quality,explo_id} = inputData;

		let date ='';
		if(month == 'now'){
			date = getNow()
		}else {
			date = `'${month}'`;
		}

		//console.log(getWaterMeter(wellid,month));
		const wellRes = await models.raw.query(getWaterMeter(wellid,date));

		const nowData = wellRes[0];


		let alterRes ;
		if( nowData.length == 1){ //TODO 有数据进行修改
			console.log(nowData)
			alterRes = await models.watermeter.update({
				waterid:wellid,
				amount:amount,
				quality:quality
			},{where:{gid:nowData[0].gid}})

			let alertWell = await models.Well.update({
				explo_id:explo_id
			},{where:{gid:wellid}})

		}else {//没有数据进行插入
			alterRes = await models.watermeter.create({
				waterid:wellid,
				amount:amount,
				quality:quality,
				submit_date: date.substring(1,8)+'-01'
			})
		}

		ctx.body ={data:wellRes[0],code:1};
	},
	/**获取当前应缴水费
	 *
	 */
	async getFee(ctx){
		const queryData = ctx.query;

		const feeResult = await models.raw.query(getFee(queryData.id));
		ctx.body={data:feeResult[0],code:1}
	},
	/**
	 * 计算水费
	 */
	async caculFee(ctx){
		const inputDate = ctx.request.body;
		const {user_id,month}= inputDate;

		const date = getMonth(month);
		const queryResult = await models.raw.query(getWaterfee(user_id,date));

		const licence = await models.Waterlicence.findOne({where:{consumerid:user_id}})
		const useData = queryResult[0];
		//初始化插入语句
		let obj = {
			licenceid:licence.gid,
			consumerid:user_id,
			totalfee:0,
			sub_date:date,
			exp_1:0,
			exp_2:0,
			exp_3:0,
			exp_4:0,
			exp_5:0,
			exp_6:0,
			exp_7:0

		}
		let sum = new Bignum(0);
		useData.forEach((value) => {
			obj[`exp_${value.gid}`] = value.sum
			//console.log(Bignum(value.sum).times(value.unitprice).toFixed(2));
			sum = sum.plus( Bignum(value.sum).times(value.unitprice));
		})
		obj.totalfee = sum.toFixed(2);

		const isalert = await IsAlert(user_id,date);

		if(isalert === null) {
			const insertResult = await models.WaterFee.create(obj);
		}else {
			const insertResult1 = await models.WaterFee.update(obj,{where:{gid:isalert[0].gid}})
		}
		//sum = sum.plus(1);


		ctx.body ={ data:obj,code:1}

	},
	/**
	 * 获取历史信息
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async gethistory(ctx){
		const queryData = ctx.query;

		const hisResult = await models.raw.query(gethistory(queryData.id));
		ctx.body={data:hisResult[0],code:1}
	},
	/**
	 * 获取当前用水申请信息
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async getAppMes(ctx){
		//consumerid
		const queryData = ctx.query;
		const consumer_id = queryData.id;
		let Result = await models.raw.query(getAppname(consumer_id));
		if(Result[0].length === 0){
			Result[0] = addLicence(consumer_id)
		}
	/*	const AppRes = Result[0].map((value)=>{
			return setAppTable(value);
		})*/
		ctx.body = {data:Result[0],code:1};
	},
	/**
	 * 修改用水申请表
	 */
	async alertLc(ctx){
		const inputdata = ctx.request.body;

		let Result = await models.Waterlicence.update(inputdata.data,{where:{gid:inputdata.gid}});
		ctx.body = {data:Result,code:1}
	},
	async getUapp(ctx){
		const queryData = ctx.query;
		const Result = await models.raw.query(getUserApp(queryData.consumer_id));
		ctx.body = {data:Result[0],code:1};
	},
	/*------------管理员功能-----*/
	async getUsers(ctx){
		const userResult = await models.raw.query(getAllconsumer());
		const wellResult = await models.raw.query(getAllWell());

		ctx.body = {
			data: {
				user: userResult[0],
				well: wellResult[0]
			},
			code:1
		}
	},
	async getAllFee(ctx) {
		const queryData = ctx.query;
		const month = getMonth(queryData.month);

		const Result = await models.raw.query(getAllFee(month));
		ctx.body ={
			data:Result[0],
			code:1
		}
	}
	,
	async login(ctx){
		const inputData = ctx.request.body;
		if(inputData.name === 'admin'){
			if(inputData.password == '321'){
				ctx.body = {data:'admin',code:1,success:1}
			}else {
				ctx.body = {data: '密码错误', code: 1, success: 0};
			}
		}else {
			let result = await models.Login.findOne({where: {user_name: inputData.name}});
			if (result) {
				const reobj = {
					name: result.name,
					gid: result.gid
				}
				if (result.password === inputData.password) {
					//密码验证成功 获取用户信息
					let consumer = await models.Consumer.findOne({where:{gid:result.consumer_id}})
					ctx.body = {data: consumer, code: 1, success: 1}
				} else {
					ctx.body = {data: '密码错误', code: 1, success: 0};
				}
			} else {
				ctx.body = {data: '用户不存在', code: 1, success: 0}
			}
			//初始化exploits
		}
	},
	async test(ctx){
		ctx.body={data:"hello world",code:1}
	}
}