/*
设定或重新设定邮箱
传入 Sno  email  参数
检查email格式
返回结果
 */

const models =require('../DB_model/model.js');
var checkEmail=require('../fun_packgae/check_email.js');

var email_set= async (ctx, next) =>
{
    //获取post数据
    var sno = ctx.request.body.sno || ''; //学生学号
    var email=ctx.request.body.email||'';//email
    if(!checkEmail(email))
    {
        ctx.response.body=
            {
                "state":"bad",
                "message":"邮箱格式错误"
            };
        return;
    }
    console.log(`设定邮箱  sno: ${sno}，email:${email}...`);

    var student=models.student;//获取student模型
    const rs=await  student.find({where:{Sno:sno}});
    if(rs==null)
    {
        ctx.response.body=
            {
                "state":"bad",
                "message":"未找到该生"
            };
        return;
    }
    else
    {
        if(rs.email==email)
        {
            ctx.response.body=
                {
                    "state":"bad",
                    "message":"与之前设定邮箱相同"
                };
            return;
        }
    }

    //数据库更新
    const result=await student.update({ email:email }, { where: { Sno: sno} }).catch(
        err=>
        {
            ctx.response.body=
                {
                    "state":"bad",
                    "message":"服务未开启"
                };
        }
    );
    if(result!=0)
    {

        ctx.response.body=
            {
                "state":"good",
                "message":"邮箱设定成功"
            };
    }
    else
    {
        ctx.response.body=
            {
                "state":"bad",
                "message":"邮箱设定失败"
            };
    }
};

module.exports =
    {

        'POST /email_set': email_set
    };