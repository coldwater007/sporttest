/*

管理员删除重要通知
传入参数： administrator   id


 */

const models =require('../DB_model/model.js');

var news_del = async (ctx, next) =>
{
    //获取post数据
    var administrator = ctx.request.body.administrator ;  //管理员
    var news_id=ctx.request.body.news_id;//获取id
    var new_info=models.new_info;//获取通知 news模型
    if(administrator==null || administrator==''||news_id==null||news_id=='')
    {
        ctx.response.body=
            {
                "state":"bad",
                "message":"参数不完整"
            };
        return;
    }
    const result=await new_info.destroy({where:{writer:administrator,id:news_id}});
    if(result!=0)
    {
        ctx.response.body=
            {
                "state":"good",
                "message":"删除通知成功"
            };
    }
    else
    {
        ctx.response.body=
            {
                "state":"bad",
                "message":"删除通知失败"
            };
    }



};

module.exports =
    {

        'POST /news_del': news_del
    };