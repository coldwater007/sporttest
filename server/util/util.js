//const uuidv1 = require('uuid/v1')
import Moment from 'moment';




































































































































































export const LicenceNumber = (gid)=>{
	let num = 100000+ gid;

	return num.toString().substr(1);
};

export const TEST = 1;

export function setAppTable (result) {
	const {exploitid,amount} = result;
	let obj ={
		watertype1: '',
		watertype2: '',
		watertype3: '',
		watertype4: '',
		watertype5: '',
		watertype6: '',
		watertype7: ''
	}

	obj[`watertype${exploitid}`] = amount;

	return Object.assign(result,obj);

}


export function getNow() {
	let date = Moment(new Date()).format("YYYY-MM");
	return `'${date}'`;
	
}

export function getMonth(month) {
	if(month == 'now') {
		let date = Moment(new Date()).format("YYYY-MM");
		return date;
	}else {
		return month;
	}
}

getNow();