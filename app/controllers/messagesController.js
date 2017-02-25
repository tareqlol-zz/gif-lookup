'use strict';

App.controller('messagesController',['$scope','$rootScope','$timeout',function ($scope,$rootScope,$timeout) {

	$rootScope.$on('message',function (e,message) {
		
		$scope.message = message.text;
		$scope.type = message.type;
		$scope.active = true;
		
		$timeout(function () {
			$scope.message = null;
			$scope.type = null;
			$scope.active = false;
		}, 3000);
	});

}])