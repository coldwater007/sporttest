/*
更新密码
 */

const models =require('../DB_model/model.js');

var password_update= async (ctx, next) =>
{
    //获取post数据
    var loadid = ctx.request.body.loadid || ''; //学生学号
    var oldpassword=ctx.request.body.oldpassword||'';
    var newpassword=ctx.request.body.newpassword||'';


    if(loadid==null || loadid=='' || oldpassword==null || oldpassword=='')
    {
        ctx.response.body=
            {
                "state":"bad",
                "message":"参数不完整"
            };
        return;
    }

    var load=models.load;
    //数据库更新
    const result=await load.update({ password:newpassword }, { where: { loadid:loadid,password:oldpassword} }).catch(
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
                "message":"修改成功"
            };
    }
    else
    {
        ctx.response.body=
            {
                "state":"bad",
                "message":"修改异常"
            };
    }
};

module.exports =
    {

        'POST /password_update': password_update
    };