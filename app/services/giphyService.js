'use strict';
App.service('giphyService',['appConfig','$http','$q','giphyDataFormatter',function (appConfig,$http,$q,giphyDataFormatter) {
	// getting giphy config from the App config factory
	var serviceConfig = appConfig.GIPHY;

	/**
	 * [get public method to be invoked from the outer service]
	 * @param  {[string]} keyword  [keyword of the search query]
	 * @param  {[number]} limit    [limit for the query]
	 * @return {[promise]}         [promise from the formatters]
	 */
	this.get = function (keyword,limit) {
		limit = limit || serviceConfig.LIMIT;
		// check if the search is random
		var randomSearch = !(keyword && keyword != '');

		// if the search is random, Send the limit to the API itself
		// it will return a promise with the results limited to the number sent
		if(!randomSearch){
			return fetchFromService(keyword,false,limit);
		}
		else{
		// Since Giphy API doesn't support limit on the random search 
		// we hit the search by the sent limit from the controller
		// and we return a promise.all 
			var promises = [];
			for (var i = 0; i < limit; i++) {
				promises.push(fetchFromService(null,true))
			}
			return $q.all(promises);
		}
	}

	/**
	 * [fetchFromService a method to fetch data from the API]
	 * @param  {[string || null]} keyword   [keyword of the query, optional]
	 * @param  {[boolean]} randomSearch 	[if the search is random or not]
	 * @param  {[number]} limit         	[limit for the query]
	 * @return {[promise]}              	[promise from the formatters]
	 */
	var fetchFromService = function (keyword,randomSearch,limit) {

		var url = serviceConfig.HOST + (randomSearch ? serviceConfig.RANDOMPATH : serviceConfig.SEARCHPATH);
		return $http({
			method: 'GET',
			url: url,
			params:{
				api_key  : serviceConfig.APIKEY,
				q : keyword,
				limit : limit || serviceConfig.LIMIT
			}
		}).then(function successCallback(response) {

			return giphyDataFormatter.formatResults(response,randomSearch);

		}, function errorCallback(response) {

			return giphyDataFormatter.formatResults(null);

		});
	}

}]);