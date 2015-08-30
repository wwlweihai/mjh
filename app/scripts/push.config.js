/**
 * Created by ww on 2015/4/11.
 */
//angular.module('app.config')
//.config([
//    '$ionicAppProvider',
//    pushConfig
//]);
//function pushConfig($ionicAppProvider) {
//    $ionicAppProvider.identify({
//        app_id: '7936949e',
//        api_key: '928da66f04e9efc8e91150b5614aa005621be47f958464a8',
//        dev_push:false
//    });
//}
var onDeviceReady   = function(){
    console.log("JPushPlugin:Device ready!")
    initiateUI();
}
var onGetRegistradionID = function(data) {
    try{
        console.log("JPushPlugin:registrationID is "+ data)
    }
    catch(exception){
        console.log(exception);
    }
}
var onTagsWithAlias = function(event){
    try{
        console.log("onTagsWithAlias");
        var result="result code:"+event.resultCode+" ";
        result+="tags:"+event.tags+" ";
        result+="alias:"+event.alias+" ";
        //$("#tagAliasResult").html(result);
    }
    catch(exception){
        console.log(exception)
    }
}
var onOpenNotification = function(event){
    try{
        var alertContent
        if(device.platform == "Android"){
            alertContent=window.plugins.jPushPlugin.openNotification.alert;
        }else{
            alertContent   = event.aps.alert;
        }
        alert("open Notificaiton:"+alertContent);

    }
    catch(exception){
        console.log("JPushPlugin:onOpenNotification"+exception);
    }
}
var onReceiveNotification = function(event){
    try{
        var alert
        if(device.platform == "Android"){
            alert = window.plugins.jPushPlugin.receiveNotification.alert;
        }else{
            alert   = event.aps.alert;
        }
        //$("#notificationResult").html(alert);
    }
    catch(exeption){
        console.log(exception)
    }
}
var onReceiveMessage = function(event){
    try{

        var message
        if(device.platform == "Android"){
            message = window.plugins.jPushPlugin.receiveMessage.message;
        }else{
            message   = event.content;
        }
        //var extras = window.plugins.jPushPlugin.extras
        //$("#messageResult").html(message);
    }
    catch(exception){
        console.log("JPushPlugin:onReceiveMessage-->"+exception);
    }
}

var initiateUI = function(){
    try{
        window.plugins.jPushPlugin.init();
        window.plugins.jPushPlugin.getRegistrationID(onGetRegistradionID);

        if(device.platform != "Android"){
            window.plugins.jPushPlugin.setDebugModeFromIos();
            window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
        }else{
            window.plugins.jPushPlugin.setDebugMode(true);
        }
        //window.plugins.jPushPlugin.setTagsWithAlias(tags,alias);
    }
    catch(exception){
        console.log(exception);
    }
}
document.addEventListener("jpush.setTagsWithAlias", onTagsWithAlias, false);
document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("jpush.openNotification", onOpenNotification, false);
document.addEventListener("jpush.receiveNotification", onReceiveNotification, false);
document.addEventListener("jpush.receiveMessage", onReceiveMessage, false);
