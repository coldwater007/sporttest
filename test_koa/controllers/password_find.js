/*
密码找回
传入 Sno 参数
通过将密码发送到对应的邮箱
实现找回
错误：
    未设定邮箱=》 提示未设定邮箱
    原先邮箱格式错误=》提示错误信息
 */

const models =require('../DB_model/model.js');
var checkEmail=require('../fun_packgae/check_email.js');
var sendEmail=require('../fun_packgae/sendEmail.js');

var password_find= async (ctx, next) =>
{
    //获取post数据
    var sno = ctx.request.body.sno || ''; //学生学号

    console.log(`找回密码  sno: ${sno}...`);
    var student=models.student;//获取student模型
    var load=models.load;
    const load_info=await load.find({where:{Loadid:sno}});
    //数据库查询
    const result=await student.find( { where: { Sno: sno} }).catch(
        err=>
        {
            ctx.response.body=
                {
                    "state":"bad",
                    "message":"服务未开启"
                };
        }
    );
    if(result==null)
    {

        ctx.response.body=
            {
                "state":"bad",
                "message":"未查到该生信息"
            };
        return;//直接返回
    }
    else
    {
       if(result.email=='1' || result.email==null)  //默认未设定邮箱为1
       {
           ctx.response.body=
               {
                   "state":"bad",
                   "message":"未设定找回邮箱"
               };
           return;//直接返回
       }
       else if(!checkEmail(result.email)) //邮箱格式错误
       {
           ctx.response.body=
               {
                   "state":"bad",
                   "message":"设定的邮箱格式错误"
               };
           return;//直接返回
       }
       else
       {

       }
    }
    //一切无误后，向指定邮箱发送密码
    var title="中国地质大学体测系统";
    var content=`${load_info.password}`;
    if(sendEmail(result.email,title,content))
    {
        ctx.response.body=
            {
                "state":"good",
                "message":"密码已发送至指定邮箱"
            };
    }
    else
    {
        ctx.response.body=
            {
                "state":"bad",
                "message":"找回密码失败"
            };
    }




};

module.exports =
    {

        'POST /password_find': password_find
    };