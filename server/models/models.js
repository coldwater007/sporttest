import {sequelzie,Sequelize} from './dbServer';

export const raw = sequelzie;

export const watermeter = sequelzie
	.define('watermeter', {
			gid: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			waterid: {
				type: Sequelize.INTEGER
			},
			waterlevel: {
				type: Sequelize.FLOAT
			},
			watertemp: {
				type: Sequelize.FLOAT
			},
			amount: {
				type: Sequelize.FLOAT
			},
			recordnum: {
				type: Sequelize.FLOAT
			},
			submit_date:{
				type: Sequelize.DATEONLY
			},
			quality:{
				type: Sequelize.STRING
			}
		},{
			freezeTableName:true,
			timestamps:false
		}
	)
export const WaterFee = sequelzie
	.define('waterfee',{
		gid:{
			type:Sequelize.INTEGER,
			primaryKey:true,
			autoIncrement:true
		},
		licenceid:{
			type:Sequelize.INTEGER
		},
		consumerid:{
			type:Sequelize.INTEGER
		},

		totalfee:{
			type:Sequelize.FLOAT
		},
		paydate:{
			type:Sequelize.DATEONLY
		},
		sub_date:{
			type:Sequelize.DATEONLY
		},
		exp_1:{
			type:Sequelize.FLOAT
		},
		exp_2:{
			type:Sequelize.FLOAT
		},
		exp_3:{
			type:Sequelize.FLOAT
		},
		exp_4:{
			type:Sequelize.FLOAT
		},
		exp_5:{
			type:Sequelize.FLOAT
		},
		exp_6:{
			type:Sequelize.FLOAT
		},
		exp_7:{
			type:Sequelize.FLOAT
		}
	},{
		freezeTableName:true,
		timestamps:false
	})

export const Consumer = sequelzie
	.define('consumer',{
		gid:{
			type:Sequelize.INTEGER,
			primaryKey:true,
			autoIncrement:true
		},
		name:{
			type:Sequelize.STRING
		} ,
		password:{
			type:Sequelize.STRING
		},
		isperson:{
			type:Sequelize.INTEGER
		}
	},{
		freezeTableName:true,
		timestamps:false
	})

export const Login = sequelzie
	.define('user_table',{
		gid:{
			type:Sequelize.INTEGER,
			primaryKey:true,
			autoIncrement:true
		},
		user_name:{
			type:Sequelize.STRING
		},
		password:{
			type:Sequelize.STRING
		},
		consumer_id:{
			type:Sequelize.INTEGER
		}
	},{
		freezeTableName:true,
		timestamps:false
	}
)

export const Well = sequelzie
	.define('well',{
		gid:{
			type:Sequelize.INTEGER,
			primaryKey:true,
			autoIncrement:true
		},
		name:{
			type:Sequelize.STRING
		} ,
		address:{
			type:Sequelize.STRING
		},
		consumerid:{
			type:Sequelize.INTEGER
		},
		explo_id:{
			type:Sequelize.INTEGER
		}
	},{
		freezeTableName:true,
		timestamps:false
	})

export const Approveunion = sequelzie
	.define('approveunion',{
		gid:{
			type:Sequelize.INTEGER,
			primaryKey:true,
			autoIncrement:true
		},
		name:{
			type:Sequelize.STRING
		}
	},{
		freezeTableName:true,
		timestamps:false
	})

export const Wateruse = sequelzie
	.define('wateruse',{
		gid:{
			type:Sequelize.INTEGER,
			primaryKey:true,
			autoIncrement:true
		},
		name:{
			type:Sequelize.STRING
		}
	},{
		freezeTableName:true,
		timestamps:false
	})

export const Exploittype = sequelzie
	.define('exploittype',{
		gid:{
			type:Sequelize.INTEGER,
			primaryKey:true,
			autoIncrement:true
		},
		name:{
			type:Sequelize.STRING
		},
		unitprice:{
			type:Sequelize.FLOAT
		}
	},{
		freezeTableName:true,
		timestamps:false
	})

export const Waterlicence = sequelzie
	.define('waterlicence',{
		gid:{
			type:Sequelize.INTEGER,
			primaryKey:true,
			autoIncrement:true
		},
		licencenumber:{
			type:Sequelize.STRING
		},
		consumerid:{
			type:Sequelize.INTEGER
		},
		approveid:{                  ///审批单位
			type:Sequelize.INTEGER
		},
		wateruser:{
			type:Sequelize.STRING
		},
		state:{
			type:Sequelize.INTEGER
		},
		extype_1:{
			type:Sequelize.FLOAT
		},
		extype_2:{
			type:Sequelize.FLOAT
		},
		extype_3:{
			type:Sequelize.FLOAT
		},
		extype_4:{
			type:Sequelize.FLOAT
		},
		extype_5:{
			type:Sequelize.FLOAT
		},
		extype_6:{
			type:Sequelize.FLOAT
		}
	},{
		freezeTableName:true,
		timestamps:false
	})

export const TimeTest = sequelzie
	.define('timetest',{
		id:{
			type:Sequelize.INTEGER,
			primaryKey:true
		},
		time:{
			type:Sequelize.DATE
		}
	},{
		freezeTableName:true,
		timestamps:false
	});





