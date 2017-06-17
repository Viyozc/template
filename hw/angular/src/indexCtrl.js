angular.module('app', [])
    .controller('indexCtrl', ['$scope', '$http','$state', function ($scope, $http,$state) {
        console.log(data);
        $scope.resultShow = false;
        $scope.result = {};
        $scope.data = data;
        $scope.questions = data.questions;
        $scope.submitForm = function () {
            console.log($scope.result);
            $scope.resultShow = true;
        }

    }])