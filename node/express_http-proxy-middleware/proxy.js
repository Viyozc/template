const express = require('express');
const proxy = require('http-proxy-middleware');//引入代理中间件
const app = express();
app.use(express.static('public')); //静态资源目录
//app.use(express.static('client'));

// Add middleware for http proxying
const apiProxy = proxy('/api', { target: 'http://localhost:8080',changeOrigin: true });//将服务器代理到localhost:8080端口上[本地服务器为localhost:3000]
app.use('/api/*', apiProxy);//api子目录下的都是用代理

// Render your site
app.get('/index.htm', function(req,res){
    res.sendFile(__dirname+'/src/index.html');
});

app.listen(3000, () => {
    console.log('Listening on: http://localhost:3000');
});

var express = require('express');
var app = express();
app.use(express.static('public'));
var server = app.listen(8080,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('应用实例，访问地址为 http://%s:%s',host,port);
})

app.get('/api/hello', function(req,res){
    let data = {}
    data["name"] = "lucy";
    data["age"] = "23";
    res.send(data);
});