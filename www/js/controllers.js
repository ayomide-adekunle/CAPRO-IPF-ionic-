angular.module('starter.controllers', [])

.controller('DashCtrl', function($state,$scope,$rootScope,$http,$cordovaSocialSharing,$ionicLoading,BookMarkService) {

$scope.Now=function() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!

  var yyyy = today.getFullYear();
  if(dd<10){
      dd='0'+dd
  } 
  if(mm<10){
      mm='0'+mm
  }
 $rootScope.NowDate=yyyy+'-'+mm+'-'+dd;
 console.log($rootScope.NowDate);
}
$scope.Now();

$rootScope.CAPRO_prayers_saved=JSON.parse(window.localStorage.getItem("prayers_capro"));
$rootScope.present=0;

$rootScope.goToSavedP = function(prayer){
      $rootScope.savedPrayer=prayer;
      console.log($rootScope.savedPrayer);
      $state.go('tab.Saved');
    };

$rootScope.savePrayers = function(prayer){
      
      BookMarkService.caproSavePrayers(prayer);
    };

$rootScope.sharePrayer=function(date,prayer) {
  var text="CAPRO IPF PRAYER"+" ["+date+"] ..."+prayer;
  $cordovaSocialSharing.shareViaWhatsApp(text, "", "");
}
$rootScope.formatPrayer=function(raw)  {
   var div = document.createElement("div");
   div.innerHTML = raw;
   var text = div.textContent || div.innerText || "";
   return text;

 }
 $rootScope.formatDate=function(str)  {
  var result=str.replace("00:00:00","");
  return result;
 }
$rootScope.all_prayers=JSON.parse(window.localStorage.getItem("prayers"));

if(!$rootScope.all_prayers) {
$http.post("http://www.caproipf.appspot.com/dataApi")
          .success(function(data) {
             //console.log(data);
       $rootScope.prayers=data;
       window.localStorage.setItem("prayers", JSON.stringify(data));
       $rootScope.all_prayers=JSON.parse(window.localStorage.getItem("prayers"));
       $rootScope.prayer_previous=$rootScope.all_prayers[0];
       for (a in $rootScope.all_prayers )  {
        console.log($rootScope.formatDate($rootScope.all_prayers[a].time),$rootScope.NowDate);
        console.log(typeof($rootScope.NowDate));
        console.log(typeof($rootScope.formatDate($rootScope.all_prayers[a].time)));

        $rootScope.lastDate=$rootScope.formatDate($rootScope.all_prayers[$rootScope.all_prayers.length-1].time);
        console.log($rootScope.lastDate,'test');

        if($rootScope.NowDate+' ' ==$rootScope.formatDate($rootScope.all_prayers[a].time)) {
        $rootScope.todayDate=$rootScope.NowDate+' ';
        $rootScope.prayerDate=$rootScope.formatDate($rootScope.all_prayers[a].time);

        $rootScope.present=a;
        $rootScope.prayer_length=$rootScope.all_prayers.length;
        $rootScope.prayer_previous=$rootScope.all_prayers[a];
        break;
      }
    }
             
          })
          .error(function(data) {
              });
        }
  else  {
    $rootScope.all_prayers=JSON.parse(window.localStorage.getItem("prayers"));
    $rootScope.prayer_previous=$rootScope.all_prayers[0];
    for (a in $rootScope.all_prayers )  {
      console.log($rootScope.formatDate($rootScope.all_prayers[a].time),$rootScope.NowDate);
      console.log(typeof($rootScope.NowDate));
      console.log(typeof($rootScope.formatDate($rootScope.all_prayers[a].time)));

      $rootScope.lastDate=$rootScope.formatDate($rootScope.all_prayers[$rootScope.all_prayers.length-1].time);
      console.log($rootScope.lastDate,'test');

      if($rootScope.NowDate+' ' ==$rootScope.formatDate($rootScope.all_prayers[a].time)) {
        $rootScope.todayDate=$rootScope.NowDate+' ';
        $rootScope.prayerDate=$rootScope.formatDate($rootScope.all_prayers[a].time);

        $rootScope.present=parseInt(a);
        $rootScope.prayer_length=$rootScope.all_prayers.length;
        $rootScope.prayer_previous=$rootScope.all_prayers[a];
        console.log($rootScope.present,$rootScope.prayer_length);
        break;
      }
    }
  }
$rootScope.show=true;


$scope.next=function() {
  $rootScope.present++;
  //console.log($rootScope.present);
  if($rootScope.present%2!=0)  {
      $rootScope.prayer_next=$rootScope.all_prayers[$rootScope.present];
  }
  else  {
    $rootScope.prayer_previous=$rootScope.all_prayers[$rootScope.present];
  }
  if($rootScope.show)  {
     $rootScope.show1=true;
     $rootScope.show=false;
    }
   else if ($rootScope.show1)  {
       $rootScope.show1=false;
       $rootScope.show=true;
    }

}

 // setTimeout(function(){alert("Hello")},3000);
 

$scope.previous= function() {
   $rootScope.present--;
   console.log($rootScope.present,$rootScope.prayer_length);
   //console.log($rootScope.present);
  if($rootScope.present%2==0)  {
      $rootScope.prayer_previous=$rootScope.all_prayers[$rootScope.present];
  }
  else  {
    $rootScope.prayer_next=$rootScope.all_prayers[$rootScope.present];
  }
   if($rootScope.show)  {
     $rootScope.show1=true;
     $rootScope.show=false;
    }
   else if ($rootScope.show1)  {
       $rootScope.show1=false;
       $rootScope.show=true;
    }
   

}

})

.controller('ChatsCtrl', function($scope, Chats,$rootScope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $rootScope.goUrl  =function (url) {
    window.open(url,'_blank','location=yes');
  }

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('SavedCtrl', function($rootScope,$state) {
 $rootScope.goToSavedP = function(prayer){
      $rootScope.savedPrayer=prayer;
      console.log($rootScope.savedPrayer);
      $state.go('tab.Saved');
    };

});
