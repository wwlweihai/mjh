/**
 * Created by ww on 2015/4/11.
 */
angular.module('app.config')
.config([
        '$ionicAppProvider',
        '$stateProvider',
        '$urlRouterProvider',
        '$ionicConfigProvider',
        'RestangularProvider',
        '$translateProvider',
        appConfig
]);
function appConfig($ionicAppProvider,$stateProvider,$urlRouterProvider,$ionicConfigProvider,RestangularProvider,$translateProvider) {
    $ionicAppProvider.identify({
        app_id: '7936949e',
        api_key: '928da66f04e9efc8e91150b5614aa005621be47f958464a8',
        dev_push:true
    });
    $translateProvider.useSanitizeValueStrategy('sanitize');
    $translateProvider.preferredLanguage('en');
    $translateProvider.useStaticFilesLoader({
        prefix: 'i18n/',
        suffix: '.json'
    });
    $ionicConfigProvider.backButton.text('').icon('ion-ios-arrow-left').previousTitleText(false);
    RestangularProvider.setBaseUrl("http://mobidev.homeip.net/wineceller/index.php");
    $ionicConfigProvider.views.transition('platform');
    //导航栏置底
    $urlRouterProvider.otherwise('/menu');
    $stateProvider
    .state('menu', {
        url: "/menu",
        templateUrl: "modules/menu.html",
        controller:'menu'
    })
    .state('events', {
        url: '/events',
        templateUrl: 'modules/events/events.html',
        controller:'events'
    })
    .state('eventDetail', {
        url: '/eventDetail',
        params:{
            id:1,
            type:0
        },
        templateUrl: 'modules/events/eventDetail/eventDetail.html',
        controller:'eventDetail'
    })
    .state('blank', {
        url: '/blank/:url',
        templateUrl: 'modules/blank/blank.html',
        controller:'blank'
    })
    .state('news', {
        url: '/news',
        templateUrl: 'modules/news/news.html',
        controller:'news'
    })
    .state('newDetail', {
        url: '/newDetail/:id',
        templateUrl: 'modules/news/newDetail/newDetail.html',
        controller:'newDetail'
    })
    ;
}
