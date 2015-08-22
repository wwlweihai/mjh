angular.module('app.controller')
	.controller('blank', blank);
blank.$inject = [
	'$stateParams',
	'$sce',
	'$scope'
];
function blank($stateParams,$sce,$scope) {
    //$scope.displayUrl = $sce.trustAsHtml($stateParams.url);
    $scope.displayUrl = $sce.trustAsResourceUrl($stateParams.url);
	activate();
	////////////////
	function activate() {
        console.log($stateParams.url);
		console.log('load blank controller success');
	}
};
