import * as models from '../models/models';
import {LicenceNumber} from "../util/util";

export default {
	/**
	 * 注册新用户
	 * @returns {Promise<void>}
	 */
	async registerUser(ctx) {
		const inputData = ctx.request.body;

		let obj = {
			name:inputData.consumer_name,
			isperson:0
		}

		const consumer = await models.Consumer.create(obj);

		const result = await models.Waterlicence.create({
			licencenumber:LicenceNumber(consumer.gid),
			consumer_id:consumer.gid,
			extype_1:0,
			extype_2:0,
			extype_3:0,
			extype_4:0,
			extype_5:0,
			extype_6:0
		})


		const login = await models.Login.create({
			user_name:inputData.user_name,
			password:inputData.password,
			consumer_id:consumer.gid
		})

		ctx.body ={data:login,code:1}

	},
	/**
	 * 修改水费价格
	 */
	async editPrice(ctx){


	},
	/**
	 * 获取所有取水用途
	 */
	async getPrice(ctx) {
		const result = await models.Exploittype.findAll();
		ctx.body = {data:result,code:1};
	}

}