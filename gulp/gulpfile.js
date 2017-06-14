// npm install require-dir --save-dev
//gulp  模块化配置
var requireDir = require('require-dir');
requireDir('./tasks', {recurse: true});