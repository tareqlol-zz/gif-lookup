'use strict';
App.directive('list',['$timeout',function ($timeout) {
  return {
  	restrict: 'E',
  	// I have used a template instead of templateUrl, in order for to be supported as a local html file due to the 
  	// Cross Origin between file:// and http://
    template: '<button class="switch-view" ng-if="inited" ng-click="switchView()">Switch View</button>\
    <section class="list-section {{currentView}}">\
    <div class="arrows prev" ng-click="prev()" ng-class="{\'visibilty-hidden\':!inited}"></div>\
    <div class="viewport">\
    <div class="list" id="{{listId}}"><div ng-class="{\'visibilty-hidden\':!inited}" ng-click="play(item)" class="image-item {{itemClass}}" ng-repeat="item in itemsList" check-if-repeat-finished>\
      <div class="image" ng-class="{\'playing\' :item.isPlaying}">\
      <img ng-if="!item.isPlaying" ng-src="{{item.stillImage}}" alt="{{item.title}}" />\
      <video autoplay loop ng-if="item.isPlaying">\
        <source src="{{item.gifImage}}" type="video/mp4">\
        Your browser does not support HTML5 video.\
      </video>\
      </div>\
    </div></div>\
    </div>\
    <div class="arrows next" ng-click="next()" ng-class="{\'visibilty-hidden\':!inited}"></div>\
    </section>',
    // Isolate the scope 
    scope:{
      itemsList : '=data'
    },
    link : function ( scope ,elem , attr) {
      scope.currentView = 'carousel';
      var carousel;
      scope.itemClass = 'item-' + parseInt(Math.random(1000) * 1000);
      scope.listId = 'list' + parseInt(Math.random(1000) * 1000);
      scope.play = function(item) {
        item.isPlaying = !item.isPlaying;
      }

      scope.next = function () {
        carousel.slideNext();
      }

      scope.prev = function () {
        carousel.slidePrev();
      }

      scope.finishedRendering = function () {
        scope.currentView = 'carousel';
        carousel = new App.carouselComponent(scope.listId,scope.itemClass);
        carousel.init();  
        scope.inited = true;
      }

      scope.switchView = function () {
        if(scope.currentView === 'carousel'){
          carousel.destroy();
          scope.currentView = 'grid';
        }
        else{
          scope.finishedRendering();
        }
      }
    }
  };
}]);

App.directive('checkIfRepeatFinished',['$timeout',function ($timeout) {
  return function(scope, element, attrs) {
    if (scope.$last){
      if(scope.$parent.finishedRendering){
        $timeout(function () {
          scope.$parent.finishedRendering();
        },1000);
      }
    }
  };
}])