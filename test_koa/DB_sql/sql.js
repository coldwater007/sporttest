//数据库查询语句sql

//mysql  数据库表名  使用  反单引号  `

//load表

//查询密码
function getpassword(loadid)
{
    return  " select password from `load`  where loadid = ${loadid} ";
}
//更新密码
function   updatepassword(loadid,password)
{
    return "update `load` set password=${password} where loadid=${loadid} ";

}
//重置密码
function resetpassword(loadid)
{

    return "update `load` set password=0 where loadid=${loadid} ";
}
//管理员密码
function  getpassword_2(id)
{
    return "select password from `adminstrator` where id=${id} ";
    
}

//sc表  即学生选课表   学号-课程号
//增加选课记录
function insert_sc(sno,stno)
{

    return "insert into `sc` values(${sno},${stno}) ";

}

//查询sno学号所选的课程号
function get_sc(sno)
{
    return  " select stno from `sc`  where sno = ${sno} ";
}

//退选sno学号所选的课程号
function del_sc(sno)
{
    return  " delete from `sc`  where sno = ${sno} ";
}

//course表  即课程表

//查询某个学号的选课信息
function get_course(sno)
{
    return "select T_no,T_place,T_teacher,T_time,T_time_course,T_start from test_arrange where T_no in (select STno from sc where Sno=${sno})";
}


//分页查询课程信息  每次10条

function  get_all_courses(left)
{
   return  "select T_no,T_place,T_teacher,T_time,T_time_course,T_limit,rnum,T_start from test_arrange,sc_record where test_arrange.T_no=sc_record.rno  limit ${left},10";
}


//插入新的课程信息

function  insert_course(place,teacher,date,course,num,start)
{
   return  "insert into edu_system.test_arrange  (T_place,T_teacher,T_time,T_time_course,T_limit,T_start)	 values   (${place},${teacher},${date},${course},${num},${start})"
}









