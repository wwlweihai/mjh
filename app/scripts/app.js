/**
 * Created by ww on 2015/3/24.
 */

angular.module('app', [
    'app.core',
    'app.value',
    'app.config',
    'app.directive',
    'app.controller'
]);
angular.module('app.core', [
    /*3rd-party modules*/
    //restful request tool
    'pascalprecht.translate',
    'ngCordovaOauth',
    //'ionic.service.core',
    //'ionic.service.push',
    'ngCordova',
    'restangular'
    //auto grow textarea for chats/chat-detail（信息发送自增长舒适框）
]);
angular.module('app.value', []);
angular.module('app.config', ['ionic','app.value']);
angular.module('app.controller', []);
angular.module('app.directive', []);
