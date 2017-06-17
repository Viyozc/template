var app = angular.module('app', ['ui.router', 'oc.lazyLoad']);

app.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('index', {
        url: '/index',
        templateUrl: 'views/index.html',
        controller: 'indexCtrl',
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load(['src/indexCtrl.js']);
            }]
        }
    })
    $urlRouterProvider.otherwise('index')
}])
