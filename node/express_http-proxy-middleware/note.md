<div id="article_content" class="article_content tracking-ad" data-mod="popu_307" data-dsm="post">

<div class="markdown_views">

单线程node.js代理中间件，用于连接，快速和浏览器同步

Node.js代理简单。 轻松配置代理中间件连接，快速，浏览器同步等。

由流行的Nodejitsu http代理提供。

## TL;DR

代理/ api请求到`http://www.example.org`

```
var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();

app.use('/api', proxy({target: 'http://www.example.org', changeOrigin: true}));
app.listen(3000);

```

可以使用所有`http-proxy`选项，以及一些额外的`http-proxy-middleware`选项。

提示：将基于名称的虚拟托管网站的选项`changeOrigin`设置为`true`。

## 内容列表

*   安装
*   核心概念
*   举个栗子
*   上下文匹配
*   选项

    *   http-proxy-middleware选项
    *   http-proxy事件
    *   http-proxy选项
*   速记

    *   app.use(path, proxy)
*   WebSocket

    *   外部Websocket升级
*   工作示例
*   Recipes
*   兼容的服务器
*   测试
*   更新日志
*   License

## Install

```
$ npm install --save-dev http-proxy-middleware
```

* * *

### proxy([context,] config)

```
var proxy = require('http-proxy-middleware');

var apiProxy = proxy('/api', {target: 'http://www.example.org'});
//                   \____/   \_____________________________/ 
//                     |                    | 
//                   context             options 

// 'apiProxy' is now ready to be used as middleware in a server. 
```

*   context：确定应将哪些请求代理到目标主机。 （更多关于上下文匹配）
*   options.target：目标主机到代理。 （协议+主机）

（`http-proxy-middleware`配置选项的完整列表）

### proxy(uri [, config])

```
// shorthand syntax for the example above: 
var apiProxy = proxy('http://www.example.org/api');
```

更多关于速记配置。

* * *

## 举个栗子

使用express服务器的示例。

```
// include dependencies 
var express = require('express');
var proxy = require('http-proxy-middleware');

// proxy middleware options 
var options = {
        target: 'http://www.example.org', // target host 
        changeOrigin: true,               // needed for virtual hosted sites 
        ws: true,                         // proxy websockets 
        pathRewrite: {
            '^/api/old-path' : '/api/new-path',     // rewrite path 
            '^/api/remove/path' : '/path'           // remove base path 
        },
        router: {
            // when request.headers.host == 'dev.localhost:3000', 
            // override target 'http://www.example.org' to 'http://localhost:8000' 
            'dev.localhost:3000' : 'http://localhost:8000'
        }
    };

// create the proxy (without context) 
var exampleProxy = proxy(options);

// mount `exampleProxy` in web server 
var app = express();
    app.use('/api', exampleProxy);
    app.listen(3000);
```

* * *

## Context matching

提供一种替代方式来决定哪些请求应该被代理;如果您无法使用服务器的路径参数来装载代理，或者需要更多的灵活性。

RFC 3986路径用于上下文匹配。

```
         foo://example.com:8042/over/there?name=ferret#nose
         \_/   \______________/\_________/ \_________/ \__/
          |           |            |            |        |
       scheme     authority       path        query   fragment
```

*   路径匹配

    *   `proxy({...})` - 匹配任意路径，所有的请求都会被代理。
    *   `proxy('/', {...})`-匹配任意路径，所有的请求都会被代理。
    *   `proxy('/api', {...})`-匹配所有以`/api`开始的路径。
*   多重路径匹配

    *   `proxy(['/api', '/ajax', '/someotherpath'], {...})`
*   通配符路径匹配
    对于细粒度控制，您可以使用通配符匹配。通过`micromatch`进行全局模式匹配。访问`micromatch`或`glob`更多`globbing`示例。

    *   `proxy('**', {...})` 匹配任意路径，所有的请求都会被代理。
    *   `proxy('**/*.html', {...})` 匹配所有以`.html`结尾的任意路径。
    *   `proxy('/*.html', {...})` 直接匹配绝对路径下的路径。
    *   `proxy('/api/**/*.html', {...})`匹配在`/api`路径下以`.html`结尾的请求。
    *   `proxy(['/api/**', '/ajax/**'], {...})`组合多重路由模式。
    *   `proxy(['/api/**', '!**/bad.json'], {...})`排除匹配。
*   自定义匹配
    为了完全控制，您可以提供一个自定义函数来确定哪些请求应该被代理。

```
var filter = function (pathname, req) {
    return (pathname.match('^/api') && req.method === 'GET');
};

var apiProxy = proxy(filter, {target: 'http://www.example.org'})
```

* * *

## 选项

### http-proxy-middleware选项

*   option.pathRewrite：对象/函数，重写目标的url路径。对象键将被用作RegExp来匹配路径。

    ```
    // rewrite path 
    pathRewrite: {'^/old/api' : '/new/api'}

    // remove path 
    pathRewrite: {'^/remove/api' : ''}

    // add base path 
    pathRewrite: {'^/' : '/basepath/'}

    // custom rewriting 
    pathRewrite: function (path, req) { return path.replace('/api', '/base/api') }
    ```

*   option.router：对象/函数，重新定位特定请求的`option.target`。

    ```
    // Use `host` and/or `path` to match requests. First match will be used. 
    // The order of the configuration matters. 
    router: {
        'integration.localhost:3000' : 'http://localhost:8001',  // host only 
        'staging.localhost:3000'     : 'http://localhost:8002',  // host only 
        'localhost:3000/api'         : 'http://localhost:8003',  // host + path 
        '/rest'                      : 'http://localhost:8004'   // path only 
    }

    // Custom router function 
    router: function(req) {
        return 'http://localhost:8004';
    }
    ```

*   option.logLevel：字符串， [‘debug’, ‘info’, ‘warn’, ‘error’, ‘silent’]. 默认：`'info'`。
*   option.logProvider：函数，修改或者替换日志服务。默认：`'console'`。

    ```
    // simple replace 
    function logProvider(provider) {
        // replace the default console log provider. 
        return require('winston');
    }
    ```

    ```
    // verbose replacement 
    function logProvider(provider) {
        var logger = new (require('winston').Logger)();

        var myCustomProvider = {
            log: logger.log,
            debug: logger.debug,
            info: logger.info,
            warn: logger.warn,
            error: logger.error
        }
        return myCustomProvider;
    }
    ```

*   （已弃用）option.proxyHost：用`option.changeOrigin = true`代替。
*   （已弃用）option.proxyTable：用`option.router`代替。

    ### http-proxy 事件

    订阅http-proxy事件

*   option.onError：函数，订阅`http-proxy`的`error`事件以进行自定义错误处理。

    ```
    function onError(err, req, res) {
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.end('Something went wrong. And we are reporting a custom error message.');
    }
    ```

*   option.onProxyRes：函数，订阅`http-proxy`的`proxyRes`事件。

    ```
    function onProxyRes(proxyRes, req, res) {
        proxyRes.headers['x-added'] = 'foobar';     // add new header to response 
        delete proxyRes.headers['x-removed'];       // remove header from response 
    }
    ```

*   option.onProxyReq：函数，订阅`http-proxy`的`proxyReq`事件。

    ```
    function onProxyReq(proxyReq, req, res) {
        // add custom header to request 
        proxyReq.setHeader('x-added', 'foobar');
        // or log the req 
    }
    ```

*   option.onProxyReqWs：函数，订阅`http-proxy`的`proxyReqWs`事件。

    ```
    function onProxyReqWs(proxyReq, req, socket, options, head) {
        // add custom header 
        proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
    }
    ```

*   option.onOpen：函数，订阅`http-proxy`的 `open`事件。

    ```
    function onOpen(proxySocket) {
        // listen for messages coming FROM the target here 
        proxySocket.on('data', hybiParseAndLogMessage);
    }
    ```

*   option.onClose：函数，订阅`http-proxy` 的`close`事件。

    ```
    function onClose(res, socket, head) {
        // view disconnected websocket connections 
        console.log('Client disconnected');
    }
    ```

* * *

### http-proxy选项

底层http-proxy库提供以下选项。

*   option.target：url字符串将与url模块解析
*   option.forward：url字符串将与url模块解析
*   option.target：传递给http(s)请求的对象（参阅Node https代理和http代理对象）
*   option.ssl：传递给https.createServer()的对象
*   option.ws：true / false，如果你想要代理websockets
*   option.xfwd：true / false，添加x-forward请求头
*   option.secure：true / false，如果你想要验证SSL证书
*   option.toProxy：true / false，将绝对URL作为`path`（对代理使用代理时很有用）
*   option.prependPath：true / false，默认：true-指定是否要将目标的路径预置到代理路径
*   option.ignorePath：true / false，默认：false-指定是否要忽略传入请求的代理路径（注意：如果需要，您将必须附加/手动）。
*   option.localAddress：用于传出连接的本地接口字符串
*   option.changeOrigin：true / false，默认值：false - 将主机头的源更改为目标URL
*   option.auth：基本认证，即“用户：密码”来计算授权头。
*   option.hostRewrite：重写（301/302/307/308）重定向的位置主机名。
*   option.autoRewrite：根据请求的主机/端口重写（301/302/307/308）重定向的位置主机/端口。默认值：false。
*   option.protocolRewrite：重写位置协议（301/302/307/308）重定向到’http’或’https’。默认值：null。
*   option.cookieDomainRewrite：重写set-cookie标头的域。可能的值：
    - `false`（默认）：禁止重写`cookie`
    - 字符串：新域名，比如说`cookieDomainRewrite:"new.domain"`。使用`cookieDomainRewrite:""`删除域名。
    - 对象：域名到新域名的映射，用”*”匹配所有域名。
    举个栗子：保持一个域名不变，重写一个域名并且删除其他的：
    `
    cookieDomainRewrite: {
    "unchanged.domain": "unchanged.domain",
    "old.domain": "new.domain",
    "*": ""
    }
    `
*   option.headers：对象，添加请求头。（比如：`{host:'www.example.org'}`）
*   option.proxyTimeout：超时时间（毫秒）当代理接收不到目标服务器的返回

* * *

## 速记

当不需要详细配置时，请使用简写语法。当使用速记时，上下文和`option.target`将被自动配置。如果需要，仍然可以使用选项。

```
proxy('http://www.example.org:8000/api');
// proxy('/api', {target: 'http://www.example.org:8000'}); 

proxy('http://www.example.org:8000/api/books/*/**.json');
// proxy('/api/books/*/**.json', {target: 'http://www.example.org:8000'}); 

proxy('http://www.example.org:8000/api', {changeOrigin:true});
// proxy('/api', {target: 'http://www.example.org:8000', changeOrigin: true}); 
```

### app.use(path, proxy)

如果要使用服务器的`app.usepath参数匹配请求;创建并装载不带`http-proxy-middleware`上下文参数的代理：

```
app.use('/api', proxy({target:'http://www.example.org', changeOrigin:true}));
```

app.use文档

*   express： [http://expressjs.com/en/4x/api.html#app.use](http://expressjs.com/en/4x/api.html#app.use)
*   connect：[https://github.com/senchalabs/connect#mount-middleware](https://github.com/senchalabs/connect#mount-middleware)

* * *

## Websocket

```
// verbose api 
proxy('/', {target:'http://echo.websocket.org', ws:true});

// shorthand 
proxy('http://echo.websocket.org', {ws:true});

// shorter shorthand 
proxy('ws://echo.websocket.org');
```

### 外部WebSocket升级

在以前的`WebSocket`示例中，`http`代理中间件依赖于初始`http`请求以便侦听`http`升级事件。如果需要在没有初始`http`请求的情况下代理`WebSockets`，则可以手动预订服务器的`http`升级事件。

```
var wsProxy = proxy('ws://echo.websocket.org', {changeOrigin:true});

var app = express();
    app.use(wsProxy);

var server = app.listen(3000);
    server.on('upgrade', wsProxy.upgrade);  // <-- subscribe to http 'upgrade' 
```

</div>

</div>