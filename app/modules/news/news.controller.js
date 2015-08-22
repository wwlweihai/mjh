angular.module('app.controller')
.controller('news',newsController);

newsController.$inject = [
    'Restangular',
    '$translate',
    '$scope'
];

function newsController(Restangular,$translate,$scope) {
    var newsReq = Restangular.one("news");
    $scope.data = {};
    $scope.data.loading = true;
    $scope.data.newsList = [];
    activited();
    function activited(){
        getNewsList($translate.use());
        console.log('获取news');
    };
    function getNewsList(lg){
        var reqParams = {
            "c":"api",
            "a":"news",
            "lang_code":lg
        };
        newsReq.get(reqParams).then(function(result){
            $scope.data.loading = false;
            $scope.data.newsList =  result.data;
        });
    };
};


