let express = require('express');
let Mock = require('mockjs');  
var request = require('request');
var app = express();
app.use('/', function(req, res) {
    console.log(req.url)
    let url = req.url;
    if(req.url.indexOf('mock') > -1){
      console.log('mock ing')
    }else if(req.url.indexOf('3000') > -1){
      url = 'http://o.dian.so:80/'+ url
    }
    req.pipe(request(url)).pipe(res);
    console.log('xxxx')
});
app.listen(3000);

//({data:[
//   {
//     type: 1,
//     detail: {
//       bd: 'xx',
//       tel: '123123123',
//       name: '狗儿龙虾',
//       phone: '123123123'
//     },
//     count: {
//       v1: 2,
//       v2: 23,
//       box: '123'
//     },
//     applyTime: '2013-123-123 12:12',
//     judgeTiem: '2013-123-123 12:21'
//   },
//   {
//     type: 2,
//     detail: {
//       bd: 'xx',
//       tel: '123123123',
//       name: '狗儿龙虾',
//       phone: '123123123'
//     },
//     count: {
//       v1: 2,
//       v2: 23,
//       box: '123'
//     },
//     applyTime: '2013-123-123 12:12',
//     judgeTiem: '2013-123-123 12:21'
//   },
//   {
//     type: 3,
//     detail: {
//       bd: 'xx',
//       tel: '123123123',
//       name: '狗儿龙虾',
//       phone: '123123123'
//     },
//     count: {
//       v1: 2,
//       v2: 23,
//       box: '123'
//     },
//     applyTime: '2013-123-123 12:12',
//     judgeTiem: '2013-123-123 12:21'
//   }
