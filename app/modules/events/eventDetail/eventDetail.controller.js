angular.module('app.controller')
.controller('eventDetail',eventDetail);

eventDetail.$inject = [
    '$ionicPopup',
    '$cordovaCalendar',
    '$cordovaSocialSharing',
    'Restangular',
    '$stateParams',
    '$translate',
    '$scope'
];

function eventDetail($ionicPopup,$cordovaCalendar,$cordovaSocialSharing,Restangular,$stateParams,$translate,$scope) {
    var eventsReq = Restangular.one("events");
    $scope.data = {};
    $scope.addCalendar = addCalendar;
    $scope.sharing = sharing;

    activited();
    function activited(){
        console.log($stateParams.id);
        console.log($stateParams.type);
        console.log('获取eventDetail');
        getEvent($stateParams.id,$stateParams.type,$translate.use());
    };
    function getEvent(id,t,lg){
        console.log(lg);
        var reqParams = {
            "c":"api",
            "a":"events",
            "id":id,
            "type":t,
            "lang_code":lg
        };
        eventsReq.get(reqParams).then(function(result){
            console.log(JSON.stringify(result.data[0]));
            $scope.data.event =  result.data[0];
        });
    }
    function addCalendar(event){
        console.log("addCalendar");
        $cordovaCalendar.createEvent({
            title: event.eventname,
            location: event.location,
            startDate: event.startdate,
            endDate: event.enddate
        }).then(function (result) {
            $ionicPopup.alert({
                title: '成功保存到日历！'
            });
        }, function (err) {
            $ionicPopup.alert({
                title: '保存到日历失败！',
                okType:'button-assertive'
            });
        });
    };
    function sharing(event){
        console.log("sharing");
        var message = event.name;
        var subject = null;
        var file = null;
        var link = null;
        $cordovaSocialSharing
            .share(message, subject, file, link) // Share via native share sheet
            .then(function(result) {
                console.log(JSON.stringify(result));
                $ionicPopup.alert({
                    title: '分享成功！'
                });
            }, function(err) {
                console.log(JSON.stringify(err));
                $ionicPopup.alert({
                    title: '分享失败！',
                    okType:'button-assertive'
                });
            });
    }
};


