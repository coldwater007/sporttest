/*
重置密码
 */

const models =require('../DB_model/model.js');

var password_reset= async (ctx, next) =>
{
    //获取post数据
    var sno = ctx.request.body.sno || ''; //学生学号
    var sname=ctx.request.body.sname||'';
    var sdepartment=ctx.request.body.sdepartment||'';


    if(sno==null || sno=='' || sname==null || sname=='')
    {
        ctx.response.body=
            {
                "state":"bad",
                "message":"参数不完整"
            };
        return;
    }

    var load=models.load;
    var set='0'
    //数据库更新
    const result=await load.update({ password:set }, { where: { loadid:sno} }).catch(
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
                "message":"重置成功"
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
};

module.exports =
    {

        'POST /password_reset': password_reset
    };