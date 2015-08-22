angular.module('app.controller')
	.controller('menu', menuController);
menuController.$inject = [
	'$ionicPlatform',
	'$ionicPush',
	'$ionicUser',
	'Restangular',
	'app',
	'$ionicModal',
	'$translate',
	'$rootScope',
	'$scope'
];
function menuController($ionicPlatform,$ionicPush,$ionicUser,Restangular,app,$ionicModal,$translate,$rootScope,$scope) {
    var menusReq = Restangular.one("menus");
    //var menusReq = Restangular.oneUrl("menus","http://mobidev.homeip.net/wineceller/index.php");

    $scope.menuOperatPopupToggle = menuOperatPopupToggle;
    $scope.languageList = app.languageList;

    activate();
	////////////////
	function activate() {
        getMenuList($translate.use());
	};
    function menuOperatPopupToggle(){
        $scope.menuOperatPopup = !$scope.menuOperatPopup;
    };
    function getMenuList(lg){
        console.log(lg);
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

    //$scope.changeLanguage = changeLanguage;
    //function changeLanguage (langKey) {
    //    $translate.use(langKey);
    //};

    $scope.identifyUser = function() {
        console.log('Ionic User: Identifying with Ionic User service');
        var user = $ionicUser.get();
        if(!user.user_id) {
            // Set your user_id here, or generate a random one.
            user.user_id = $ionicUser.generateGUID();
        };
        // Add some metadata to your user object.
        angular.extend(user, {
            name: 'Ion3123itron',
            bio: 'I come from pla22net Ion'
        });

        // Identify your user with the Ionic User Service
        $ionicUser.identify(user).then(function(){
            $scope.identified = true;
            console.log('Identified user ' + user.name + '\n ID ' + user.user_id);
        }, function(err) {
            console.log('faild ！Identified user ' + user.name + '\n ID ' + user.user_id);
        });
    };
    $scope.pushRegister = function() {
        console.log('Ionic Push: Registering user');
        // Register with the Ionic Push service.  All parameters are optional.
        pushRegister();
    };
    $ionicPlatform.ready(function() {
        console.log($ionicPush);
        //pushRegister();
    });
    function pushRegister(){
        $ionicPush.register({
            canShowAlert: true, //Can pushes show an alert on your screen?
            canSetBadge: true, //Can pushes update app icon badges?
            canPlaySound: true, //Can notifications play a sound?
            canRunActionsOnWake: true, //Can run actions outside the app,
            onNotification: function(notification) {
                // Handle new push notifications here
                // console.log(notification);
                return true;
            }
        });
    }
    $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
        alert("Successfully registered token " + data.token);
        console.log('Ionic Push: Got token ', data.token, data.platform);
        $scope.token = data.token;
    });
};
