'use strict';

App.controller('viewController',['$scope','$rootScope','giphyService',function ($scope,$rootScope,giphyService) {
	$scope.showLoading = false;
	/**	
	 * [search search for the required keyword or random]
	 * @param  {[boolean]} random [if the search is random or not ]
	 * @return {[void]}        
	 */
	$scope.search = function (random) {
		$scope.showLoading = true;
		var keyword = random ? '' :  $scope.searchQuery ;
		if(random){$scope.searchQuery = '';}
		giphyService
			.get(keyword)
			.then(function (response) {
				$scope.searchKeyword = random ? '"Random Gifs"' : '"' + $scope.searchQuery + '"';
				$scope.giphyCarouselList = response ;
				$scope.showLoading = false;
			})
			.catch(function (err) {
				$rootScope.$broadcast('message',{
					text : err.message,
					type: 'alert'
				});
			});	
	}
	
}])