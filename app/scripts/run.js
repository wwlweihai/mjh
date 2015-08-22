angular.module('app.run')
.run([
    '$rootScope',
    '$ionicUser',
    '$ionicPush',
    appRun
]);
function appRun($rootScope,$ionicUser,$ionicPush){
    //$ionicUser.identify({
    //    user_id: $ionicUser.generateGUID()
    //}).then(function(result) {
    //    console.log('result: ' + result);
    //}, function(err) {
    //    // error
    //});
    //$ionicPush.register({
    //        canShowAlert: false
    //        //onNotification: function(notification) {
    //        //    console.log('onNotification', JSON.stringify(notification) );
    //        //    // Called for each notification for custom handling
    //        //    $scope.lastNotification = JSON.stringify(notification);
    //        //}
    //    }).then(function(deviceToken) {
    //        //console.log("deviceToken",deviceToken);
    //        //$scope.token = deviceToken;
    //    });
    //$rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
    //    console.log('Got token', data.token, data.platform);
    //});
}
