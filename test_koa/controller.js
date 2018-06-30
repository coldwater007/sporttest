/*

完成controllers目录下
所有导出的函数逻辑的解析
并通过router.post  router.get
方式  注册到系统中

 */



const fs = require('fs');

//映射函数
//将controller暴露的json串   解析成对应映射关系
function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);  //注册到url请求中
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        }
         else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    fs.readdirSync(__dirname + '/' + dir).filter((f) => {
        return f.endsWith('.js');
    }).forEach((f) => {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/' + dir + '/' + f);
        addMapping(router, mapping);
    });
}

module.exports = function (dir) {
    let
        //默认 求情逻辑放在 controllers目录下
        controllers_dir = dir || 'controllers',
        router = require('koa-router')();
        //获得系统router
        addControllers(router, controllers_dir);
        //向系统router中添加  controllers目录下的请求逻辑
    return router.routes();
};