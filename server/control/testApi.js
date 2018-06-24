import * as Model from '../models/models';

async function gettime() {
	const data = await Model.TimeTest.findAll();
	console.log('结果data',data[0].time);
}

export async function insertTIme() {
	//const data = await Model.TimeTest.create({id:2,time:'2017-01-09 02:00:00'});
	const data = await Model.TimeTest.create({id:2,time:new Date()});
	console.log('结果',data);
}



//gettime();

//insertTIme();