const Sequelize = require('sequelize');

const sequelzie =new Sequelize('postgres://postgres:123456@120.25.252.245:5432/suzhou',{timezone:'Hongkong'});


sequelzie
	.authenticate()
	.then( ()=> {
		console.log('链接成功')
	})
	.catch( err => {
		console.error('连接失败',err)
	})

export {sequelzie,Sequelize}