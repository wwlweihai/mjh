function pushConfig(a){a.identify({app_id:"7936949e",api_key:"928da66f04e9efc8e91150b5614aa005621be47f958464a8",dev_push:!0})}function appConfig(a,b,c,d,e){e.useSanitizeValueStrategy("sanitize"),e.preferredLanguage("en"),e.useStaticFilesLoader({prefix:"i18n/",suffix:".json"}),c.backButton.text("").icon("ion-ios-arrow-left").previousTitleText(!1),d.setBaseUrl("http://mobidev.homeip.net/wineceller/index.php"),c.views.transition("platform"),b.otherwise("/menu"),a.state("menu",{url:"/menu",templateUrl:"modules/menu.html",controller:"menu"}).state("events",{url:"/events",templateUrl:"modules/events/events.html",controller:"events"}).state("eventDetail",{url:"/eventDetail",params:{id:1,type:0},templateUrl:"modules/events/eventDetail/eventDetail.html",controller:"eventDetail"}).state("blank",{url:"/blank/:url",templateUrl:"modules/blank/blank.html",controller:"blank"}).state("news",{url:"/news",templateUrl:"modules/news/news.html",controller:"news"}).state("newDetail",{url:"/newDetail/:id",templateUrl:"modules/news/newDetail/newDetail.html",controller:"newDetail"})}function menuController(a,b,c,d,e,f,g,h,i){function j(){l(g.use())}function k(){i.menuOperatPopup=!i.menuOperatPopup}function l(a){console.log(a);var b={c:"api",a:"menu",lang_code:a};o.get(b).then(function(a){i.menuList=a.data})}function m(){i.languageSetModal.hide()}function n(){var a=null;ionic.Platform.isAndroid()?a={senderID:"wine-celler"}:ionic.Platform.isIOS()&&(a={badge:"true",sound:"true",alert:"true"}),$cordovaPush.register(a).then(function(a){console.log("Register success "+a),$cordovaToast.showShortCenter("Registered for push notifications"),i.registerDisabled=!0,ionic.Platform.isIOS()&&(i.regId=a,storeDeviceToken("ios"))},function(a){console.log("Register error "+a)})}var o=d.one("menus");i.menuOperatPopupToggle=k,i.languageList=e.languageList,j(),i.$on("$ionicView.beforeEnter",function(){i.menuOperatPopup=!1}),f.fromTemplateUrl("modules/languageSetModal/languageSetModal.html",{scope:i,animation:"slide-in-up"}).then(function(a){i.languageSetModal=a}),i.openLanguageSetModal=function(){i.languageSetModal.show()},i.closeLanguageSetModal=m,i.updateLanguage=function(a){g.use(a.mark),l(a.mark),m()},i.$on("$destroy",function(){i.languageSetModal.remove()}),i.$on("modal.hidden",function(){}),i.$on("modal.removed",function(){}),i.identifyUser=function(){console.log("Ionic User: Identifying with Ionic User service");var a=c.get();a.user_id||(a.user_id=c.generateGUID()),angular.extend(a,{name:"Ion3123itron",bio:"I come from pla22net Ion"}),c.identify(a).then(function(){i.identified=!0,console.log("Identified user "+a.name+"\n ID "+a.user_id)},function(b){console.log("faild ！Identified user "+a.name+"\n ID "+a.user_id)})},i.pushRegister=function(){console.log("Ionic Push: Registering user"),n()},a.ready(function(){console.log(b)}),i.$on("$cordovaPush:notificationReceived",function(a,b){console.log(JSON.stringify([b])),ionic.Platform.isAndroid()?handleAndroid(b):ionic.Platform.isIOS()&&(handleIOS(b),i.$apply(function(){i.notifications.push(JSON.stringify(b.alert))}))})}function eventsController(a,b,c){function d(){f(c.data.selectedId,b.use())}function e(a){c.data.selectedId=a,f(a,b.use())}function f(a,b){console.log(b);var d={c:"api",a:"events",type:a,lang_code:b};g.get(d).then(function(a){c.data.events=a.data})}var g=a.one("events");c.data={},c.data.lg=b.use(),c.data.selectedId=1,c.data.events=[],c.navTo=e,d()}function eventDetail(a,b,c,d,e,f,g){function h(){console.log(e.id),console.log(e.type),console.log("获取eventDetail"),i(e.id,e.type,f.use())}function i(a,b,c){console.log(c);var d={c:"api",a:"events",id:a,type:b,lang_code:c};l.get(d).then(function(a){console.log(JSON.stringify(a.data[0])),g.data.event=a.data[0]})}function j(c){console.log("addCalendar"),b.createEvent({title:c.eventname,location:c.location,startDate:c.startdate,endDate:c.enddate}).then(function(b){a.alert({title:"成功保存到日历！"})},function(b){a.alert({title:"保存到日历失败！",okType:"button-assertive"})})}function k(b){console.log("sharing");var d=b.name,e=null,f=null,g=null;c.share(d,e,f,g).then(function(b){console.log(JSON.stringify(b)),a.alert({title:"分享成功！"})},function(b){console.log(JSON.stringify(b)),a.alert({title:"分享失败！",okType:"button-assertive"})})}var l=d.one("events");g.data={},g.addCalendar=j,g.sharing=k,h()}function newsController(a,b,c){function d(){e(b.use()),console.log("获取news")}function e(a){var b={c:"api",a:"news",lang_code:a};f.get(b).then(function(a){c.data.loading=!1,c.data.newsList=a.data})}var f=a.one("news");c.data={},c.data.loading=!0,c.data.newsList=[],d()}function newDetail(a,b,c,d,e){function f(){console.log(b.id),g(b.id,c.use()),console.log("获取new")}function g(a,b){var c={c:"api",a:"news",id:a,lang_code:b};h.get(c).then(function(a){e.data.loading=!1,e.data.news=a.data,e.data.detailContent=d.trustAsHtml(a.data.excerpt)})}var h=a.one("news");e.data={},e.data.loading=!0,f()}function blank(a,b,c){function d(){console.log(a.url),console.log("load blank controller success")}c.displayUrl=b.trustAsResourceUrl(a.url),d()}angular.module("app",["app.core","app.value","app.config","app.directive","app.controller"]),angular.module("app.core",["pascalprecht.translate","ngCordovaOauth","ionic.service.core","ionic.service.push","ngCordova","restangular"]),angular.module("app.value",[]),angular.module("app.config",["ionic","app.value"]),angular.module("app.controller",[]),angular.module("app.directive",[]),angular.module("app.config").config(["$ionicAppProvider",pushConfig]),angular.module("app.config").config(["$stateProvider","$urlRouterProvider","$ionicConfigProvider","RestangularProvider","$translateProvider",appConfig]),angular.module("app.value").value("app",{language:"en",languageList:[{name:"汉语",mark:"zh"},{name:"english",mark:"en"}]}),angular.module("app.controller").controller("menu",menuController),menuController.$inject=["$ionicPlatform","$ionicPush","$ionicUser","Restangular","app","$ionicModal","$translate","$rootScope","$scope"],angular.module("app.controller").controller("events",eventsController),eventsController.$inject=["Restangular","$translate","$scope"],angular.module("app.controller").controller("eventDetail",eventDetail),eventDetail.$inject=["$ionicPopup","$cordovaCalendar","$cordovaSocialSharing","Restangular","$stateParams","$translate","$scope"],angular.module("app.controller").controller("news",newsController),newsController.$inject=["Restangular","$translate","$scope"],angular.module("app.controller").controller("newDetail",newDetail),newDetail.$inject=["Restangular","$stateParams","$translate","$sce","$scope"],angular.module("app.controller").controller("blank",blank),blank.$inject=["$stateParams","$sce","$scope"];