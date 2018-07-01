/*
学生登陆密码表 ： load
stu_login: 密码验证
password_update: 密码修改
password_reset: 密码重置



 */
const models =require('../DB_model/model.js');

//学生登陆验证

var stu_login = async (ctx, next) =>
{
    //获取post数据
    var loadid = ctx.request.body.loadid || '';
    var password = ctx.request.body.password || '';

    console.log(`loadid: ${loadid}, password: ${password}`);
    //验证
    var load=models.load;//获取load模型
    //数据库查询
    const result=await  load.find({where: { loadid: loadid,password:password}}).catch(
        err=>
        {
            ctx.response.body=
                {
                    "state":"bad",
                    "message":"服务未开启"
                };
        }
    );
    if(result!=null)
    {
        console.log(result.toJSON());
        ctx.response.body=
            {
                "state":"good",
                "message":"验证成功"
            };
    }
    else
    {
        ctx.response.body=
            {
                "state":"bad",
                "message":"验证失败"
            };
    }
};

//修改密码


var password_update = async (ctx, next) =>
{
    //获取post数据
    var loadid = ctx.request.body.loadid || '';
    var oldpassword=ctx.request.body.oldpassword ||'';
    var newpassword = ctx.request.body.newpassword || '';

    console.log(`loadid: ${loadid}, newpassword: ${newpassword}`);
    //验证
    var load=models.load;//获取load模型
    //数据库查询
    const result=await  load.update({ password:newpassword }, { where: { loadid: loadid,password:oldpassword } }).catch(
        err=>
        {
            ctx.response.body=
                {
                    "state":"bad",
                    "message":"服务未开启"
                };
        }
    );
    //update返回值 result表示 记录变化条数   为0表示修改失败
    if(result!=0)
    {
        console.log(result);
        ctx.response.body=
            {
                "state":"good",
                "message":"修改成功"
            };
    }
    else
    {
        ctx.response.body=
            {
                "state":"bad",
                "message":"修改失败"
            };
    }
};

//密码重置为0  需要验证  学号 姓名 学院  一致性
var password_reset = async (ctx, next) =>
{
    //获取post数据
    var sno = ctx.request.body.sno || '';
    var sname=ctx.request.body.sname ||'';
    var sdepartment = ctx.request.body.sdepartment || '';


    //验证
    var load=models.load;//获取load模型
    var student=models.student;
    //数据库查询
    const result=await student.find({where: { sno:sno,sname:sname,sdepartment:sdepartment}}).catch(
        err=>
        {
            ctx.response.body=
                {
                    "state":"bad",
                    "message":"服务未开启"
                };
        }
    );
    if(result!=null)  //说明存在该生
    {
        console.log(result.toJSON());
        var newpassword="0";//默认重置后密码为0
        const result2=await  load.update({ password:newpassword }, { where: { loadid: sno} }).catch(
            err=>
            {
                ctx.response.body=
                    {
                        "state":"bad",
                        "message":"服务未开启"
                    };
            }
        );
        //update返回值 result表示 记录变化条数   为0表示修改失败
        if(result2!=0)
        {
            console.log(result);
            ctx.response.body=
                {
                    "state":"good",
                    "message":"已重置为初始密码(0)"
                };
        }
        else
        {
            ctx.response.body=
                {
                    "state":"bad",
                    "message":"重置失败"
                };
        }

    }
    else
    {
        ctx.response.body=
            {
                "state":"bad",
                "message":"身份验证失败"
            };
    }





};







module.exports =
    {

        'POST /stu_login': stu_login,
        'POST /password_update':password_update,
        'POST /password_reset':password_reset
    };