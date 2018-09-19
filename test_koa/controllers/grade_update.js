/*
更新成绩
 */

const models =require('../DB_model/model.js');

var grade_update= async (ctx, next) =>
{
    //获取post数据
    var id = ctx.request.body.id || ''; //学生学号
    var testtime=ctx.request.body.testtime||'';//测试年份
    var name=ctx.request.body.name||'';
    var sex=ctx.request.body.sex||'';
    var height=ctx.request.body.height||'';
    var weight=ctx.request.body.weight||'';
    var lung=ctx.request.body.lung||'';
    var frun=ctx.request.body.frun||'';
    var jump=ctx.request.body.jump||'';
    var zuowei=ctx.request.body.zuowei||'';
    var erun=ctx.request.body.erun||'';
    var onerun=ctx.request.body.onerun||'';
    var ywqz=ctx.request.body.ywqz||'';
    var ytxs=ctx.request.body.ytxs||'';
    var zongfen=ctx.request.body.zongfen||'';
    var level=ctx.request.body.level||'';
    var xuejihao=ctx.request.body.xuejihao||'';

    if(id==null || id=='' || testtime==null || testtime=='')
    {
        ctx.response.body=
            {
                "state":"bad",
                "message":"参数不完整"
            };
        return;
    }

    var grade=models.grade;
    //数据库更新
    const result=await grade.update({ name:name,sex:sex,height:height,weight:weight,lung:lung,frun:frun,jump:jump,zuowei:zuowei,erun:erun,onerun:onerun,ywqz:ywqz,ytxs:ytxs,zongfen:zongfen,level:level,xuejihao:xuejihao }, { where: { id:id,testtime:testtime} }).catch(
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

        'POST /grade_update': grade_update
    };