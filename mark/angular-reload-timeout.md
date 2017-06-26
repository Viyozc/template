#### 异步操作,刷新页面,加timeout才有作用?
service
``` 
 }).success(function (data) {
                console.log(data);
                $timeout(function () {
                    $rootScope._loading.finish();
                    if (data.code === '10000') {
                        SweetAlert.swal({
                            title: '成功',
                            text: '数据操作成功',
                            type: 'success'
                        }, function () {
                            cb && cb(data)
                        })

                    } else {
                        console.log(data.msg);
                        SweetAlert.swal({
                            title: '错误',
                            text: '数据操作失败',
                            type: 'error'
                        });
                        return;
                    }
                },200)

            })
```
controller:
```
   $scope.deletePayment = function (id,index) {
        $scope.deleteConfirm(function () {
            console.log(id,index)
            var params = {
                pId:id,
                type:'3'
            };
            systemData.operPayment(params,function () {
                $state.go('index.getPaymentList',{},{reload:true});
            })
        })
    }
```