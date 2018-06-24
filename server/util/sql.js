
export function getWell(consumerId) {
	return ` SELECT well.gid , well."name" ,well.address ,watermeter.recordtime,watermeter.recordnum,watermeter.amount,quality
             FROM well,watermeter
             WHERE well.consumerid = ${consumerId} AND watermeter.waterid = well.gid AND watermeter.recordtime = (
	         SELECT MAX(watermeter.recordtime ) FROM watermeter WHERE watermeter.waterid = well.gid
             );`
}

export function getWellMon(consumer,month) {
	return `SELECT well.gid,well.name,well.address,well.explo_id,exploittype.name as type,watermeter.amount ,watermeter.quality 
			FROM exploittype,well left join watermeter 
			on well.gid = watermeter.waterid 
			and to_char(watermeter.submit_date,'YYYY-MM') = ${month} 
			where well.explo_id = exploittype.gid and well.consumerid = ${parseInt(consumer)}`;
}

export function getWaterFee(consumerId) {
	return `SELECT waterlicence.licencenumber,consumer."name",exploittype."name",exploittype.unitprice,waterfee.amount,waterfee.totalfee,waterfee.paydate
			FROM waterlicence,exploittype,consumer,waterfee
			WHERE waterlicence.gid = waterfee.licenceid AND consumer.gid = ${consumerId} AND waterfee.exploitid = exploittype.gid;`;
}
export function getFee(id) {
	return `SELECT waterfee.gid,waterlicence.licencenumber,consumer."name",exp_1,exp_2,exp_3,exp_4,exp_5,exp_6,exp_7,totalfee,sub_date
			FROM waterlicence,waterfee,consumer
			WHERE waterfee.consumerid = ${id}
			AND waterlicence.gid = waterfee.licenceid
			AND consumer.gid = waterfee.consumerid
			ORDER BY sub_date DESC;`

}
export function gethistory(id) {
	const sql = `SELECT watermeter.gid,well."name",watermeter.amount,watermeter.recordnum,watermeter.recordtime,watermeter.quality
				FROM watermeter,well
				WHERE watermeter.waterid =well.gid`;
	if(id === 'a' ){
		return sql + ';';
	}else {
		return sql +` AND well.gid = ${id};`;
	}
}

export function getAppname(id) {
	return `SELECT waterlicence.gid,waterlicence.licencenumber,waterlicence.wateruser,waterlicence.amount,waterlicence."state",waterlicence.extype_1,waterlicence.extype_2,waterlicence.extype_3,waterlicence.extype_4,waterlicence.extype_5,waterlicence.extype_6
	FROM waterlicence
	WHERE   waterlicence.consumerid = ${id};`;
}

export function getUserApp(id) {
	return `
	SELECT waterlicence.*,waterlicence.wateruser,well.address,approveunion."name" as appname
	FROM waterlicence,well,approveunion
	WHERE waterlicence.wellid = well.gid  AND approveunion.gid = waterlicence.approveid AND waterlicence.consumerid = ${id};`
}

export function getWaterMeter(id,month) {
	return `SELECT * FROM watermeter WHERE waterid = ${parseInt(id)} AND to_char(watermeter.submit_date,'YYYY-MM') = ${month} ;`;
}

export function getWaterfee(id,month) {
	return `SELECT exploittype."name",SUM(watermeter.amount),exploittype.unitprice,exploittype.gid
			From watermeter,exploittype,well
			WHERE to_char(watermeter.submit_date,'YYYY-MM') = '${month}' 
			AND watermeter.waterid = well.gid
			AND well.explo_id = exploittype.gid
			AND well.consumerid = ${id}
			GROUP BY exploittype."name",exploittype.unitprice,exploittype.gid`
}

export function getAllconsumer() {
	return `SELECT consumer.gid,name from consumer;`;
}
export function getAllFee(month) {
	return `SELECT waterfee.gid,waterlicence.licencenumber,
			 consumer.name,waterfee.exp_1,
			 waterfee.exp_2,waterfee.exp_3,
			 waterfee.exp_4,waterfee.exp_5,
			 waterfee.exp_6,waterfee.exp_7,
			 waterfee.totalfee
			 FROM waterfee,consumer,waterlicence
			 WHERE to_char(sub_date,'YYYY-MM') = '${month}' 
			 AND waterlicence.gid = waterfee.licenceid
			 AND consumer.gid = waterfee.consumerid`;
}

export function getAllWell() {
	return `SELECT well.gid,well.name,address,consumerid,exploittype."name" as type
			FROM well,consumer,exploittype
			WHERE well.consumerid = consumer.gid
			AND well.explo_id = exploittype.gid`;
}

export function getOneFee(consumer,month) {
	return `SELECT * FROM waterfee WHERE consumerid = ${consumer} AND to_char(sub_date,'YYYY-MM') = '${month}';`
}