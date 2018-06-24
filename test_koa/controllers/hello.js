

var fn_hello = async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
};

//向外暴露get逻辑
module.exports = {
    'GET /hello/:name': fn_hello
};