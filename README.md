# gif-lookup
#### AngularJS App built to view gif images from Giphy API
***
  # Demo : https://tareqlol.github.io/gitRepos/gif-lookup/index.html
***
1. The app is using Service oriented structure as it can be later on extended for supporting other APIs (other than giphy). Services are under ##/app/services##

2. GiphyService has the ability to judge wither the current request will be Random or keyword based and it will hit the right API path provided from the AppConfig factory.

3. AppConfig has the config for the APIs (giphy); the random path, search path, and the limit. the Limit can be over-ridden by passing it to the service get method.

4. The app uses a dynamic attribute formatters for refining the required api attributes, these formatters will provide a mapped view params. Formatters are under /app/services/formatters

5. The list directive is the one that views the formatted results from the formatters. it has two layout views Grid, Carousel. carousel list uses a JS plugin which is written from scratch in vanilla JS for the DOM manipulation. The reason behind using nativeJS vs the angular.element() as the later lacks some of the desired functionality for applying some styles. 
