angular.module('app.controller')
.controller('events',eventsController);

eventsController.$inject = [
    'Restangular',
    '$translate',
    '$scope'
];
function eventsController(Restangular,$translate,$scope) {
    var eventsReq = Restangular.one("events");

    $scope.data = {};
    $scope.data.lg = $translate.use();
    $scope.data.selectedId = 1;
    $scope.data.events = [];
    $scope.navTo = navTo;
    activited();
    function activited(){
         getEvents($scope.data.selectedId,$translate.use());
    };
    function navTo(id){
        $scope.data.selectedId = id;
        //$scope.data.events = [];
        getEvents(id,$translate.use());
    };
    function getEvents(t,lg){
        console.log(lg);
        var reqParams = {
            "c":"api",
            "a":"events",
            "type":t,
            "lang_code":lg
        };
        eventsReq.get(reqParams).then(function(result){
            $scope.data.events =  result.data;
        });
    }
};


