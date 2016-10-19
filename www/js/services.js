angular.module('starter.services', [])

.service('BookMarkService', function ($rootScope,$ionicLoading){

  this.caproSavePrayers = function(prayers) {

    $rootScope.CAPRO_prayers_saved=JSON.parse(window.localStorage.getItem("prayers_capro"));
    console.log($rootScope.CAPRO_prayers_saved);

    $rootScope.existing_prayer=0;
    if(!$rootScope.CAPRO_prayers_saved) {
      $rootScope.CAPRO_prayers_saved=[];
      console.log('hi');
    }

   if($rootScope.CAPRO_prayers_saved)  {
    console.log('hello');

    for ( a in $rootScope.CAPRO_prayers_saved) {
      console.log($rootScope.CAPRO_prayers_saved[a].prayers,prayers);
      if ($rootScope.CAPRO_prayers_saved[a].prayers.time===prayers.time)
      {
        $rootScope.existing_prayer=1;
        $ionicLoading.show({ template: 'Prayer already saved', noBackdrop: true, duration: 2000 });
        return;
      }
    }
    console.log($rootScope.existing_prayer);
    }

    if($rootScope.existing_prayer==0) {
      $rootScope.CAPRO_prayers_saved.push({
        prayers
      });
      $ionicLoading.show({ template: 'Prayer Saved', noBackdrop: true, duration: 2000 });
    }
    console.log($rootScope.CAPRO_prayers_saved);
    //window.localStorage.CAPRO_prayers_saved = JSON.stringify($rootScope.user_prayers);
    window.localStorage.setItem("prayers_capro", JSON.stringify($rootScope.CAPRO_prayers_saved));
    $rootScope.CAPRO_prayers_saved=JSON.parse(window.localStorage.getItem("prayers_capro"));
    $rootScope.$broadcast("new-bookmark");
  };

  
 

  this.getBookmarks = function(){
    // To arrange the words in order to return the last saved first
    var saved_words=JSON.parse(window.localStorage.ionFullApp_feed_words || '[]');
    var arranged_words=[];
    var length=saved_words.length;
    for(i=length-1;i>=0;i--)  {
      arranged_words.push(saved_words[i])
    }
    var saved_words=arranged_words;
    return {
      feeds : JSON.parse(window.localStorage.ionFullApp_feed_bookmarks || '[]'),
      wordpress: JSON.parse(window.localStorage.ionFullApp_wordpress_bookmarks || '[]'),
      saved_words:saved_words
    };
  };
})
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];
console.log("hello");
  return {

    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
