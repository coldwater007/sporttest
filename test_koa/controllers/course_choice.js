/*
学生选课
指定 学号 Sno  课程号 T_no
返回 good   选课成功
bad:
   课已经选满
   已经选定了一节课
 */

const models =require('../DB_model/model.js');

var course_choice = async (ctx, next) =>
{
    //获取post数据
    var sno = ctx.request.body.sno || '';  //学号
    var stno=ctx.request.body.stno ||'';  //课程号
    var sc=models.sc;//获取sc模型

    //首先查询是否已经选课
    const result=await sc.find({where: { Sno:sno}});
    if(result!=null)  //已经选了课程（需要先退课）
    {
        console.log(result.toJSON());
        ctx.response.body=
            {
                "state":"bad",
                "message":"您已经选了课程、请先退课"
            };
    }
    else
    {
        //查询该课程是否满人
        var course=models.course;
        const result2=await course.find({where:{ T_no:stno}}).catch(
            err=>
            {
                ctx.response.body=
                    {
                        "state":"bad",
                        "message":"服务未开启"
                    };
            }
        );
        if(result2!=null)
        {
            if(result2.T_num<result2.T_limit)  //还没有到达选课上限
            {
                //写入选课记录
                const ts=await course.update({ T_num:result2.T_num+1 }, { where: { T_no: stno} });  //选择该课程人数+1
                const tx=await sc.create({Sno:sno,STno:stno});//sc表中插入选课记录
                if(tx!=0 && ts!=0)
                {
                    ctx.response.body=
                        {
                            "state":"good",
                            "message":"选课成功"
                        };
                }
                else
                {
                    ctx.response.body=
                        {
                            "state":"bad",
                            "message":"选课失败"
                        };
                }

            }
            else
            {
                ctx.response.body=
                    {
                        "state":"bad",
                        "message":"该课程人数已满"
                    };
            }
        }
        else
        {
            ctx.response.body=
                {
                    "state":"bad",
                    "message":"未找到课程信息"
                };
        }

    }
};

module.exports =
    {

        'POST /course_choice': course_choice
    };