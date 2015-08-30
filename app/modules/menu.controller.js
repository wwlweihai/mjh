angular.module('app.controller')
	.controller('menu', menuController);
menuController.$inject = [
	'Restangular',
	'app',
	'$ionicModal',
	'$translate',
	'$scope'
];
function menuController(Restangular,app,$ionicModal,$translate,$scope) {

    var menusReq = Restangular.one("menus");
    //var menusReq = Restangular.oneUrl("menus","http://mobidev.homeip.net/wineceller/index.php");

    $scope.menuOperatPopupToggle = menuOperatPopupToggle;
    $scope.languageList = app.languageList;
    $scope.data = {};
    //$scope.data.deviceToken = $cordovaDevice.getUUID();
    $scope.data.platformName = ionic.Platform.platform();
    ionic.Platform.ready(function(){
        $scope.data.deviceToken = device.uuid;
        getMenuList($translate.use());
    });
    function menuOperatPopupToggle(){
        $scope.menuOperatPopup = !$scope.menuOperatPopup;
    };
    function getMenuList(lg){
        var reqParams = {
            "c":"api",
            "a":"menu",
            "lang_code":lg
        };
        menusReq.get(reqParams).then(function(result){
            $scope.menuList = result.data;
        });
    }
    $scope.$on('$ionicView.beforeEnter', function(){
        $scope.menuOperatPopup = false;
    });
    //languages Set modal
    $ionicModal.fromTemplateUrl('modules/languageSetModal/languageSetModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.languageSetModal = modal;
    });
    $scope.openLanguageSetModal = function() {
        $scope.languageSetModal.show();
    };
    $scope.closeLanguageSetModal = closeLanguageSetModal;

    $scope.updateLanguage = function(item){
        $translate.use(item.mark);
        getMenuList(item.mark);
        closeLanguageSetModal();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.languageSetModal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });
    function closeLanguageSetModal() {
        $scope.languageSetModal.hide();
    };





};
