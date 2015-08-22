angular.module('app.controller')
.controller('newDetail',newDetail);

newDetail.$inject = [
    'Restangular',
    '$stateParams',
    '$translate',
    '$sce',
    '$scope'
];

function newDetail(Restangular,$stateParams,$translate,$sce,$scope) {
    var newsReq = Restangular.one("news");

    $scope.data = {};
    $scope.data.loading = true;
    activited();
    function activited(){
        console.log($stateParams.id);
        getNews($stateParams.id,$translate.use());
        console.log('获取new');
    };
    function getNews(id,lg){
        var reqParams = {
            "c":"api",
            "a":"news",
            "id":id,
            "lang_code":lg
        };
        newsReq.get(reqParams).then(function(result){
            $scope.data.loading = false;
            $scope.data.news =  result.data;
            $scope.data.detailContent = $sce.trustAsHtml(result.data.excerpt);
        });
    };
};


