import APICONFIGS from '@/config/config';
import giphyDataFormatter from '@/services/formatters/giphy';
import Vue from 'vue';


// getting giphy config from the App config factory
const serviceConfig = APICONFIGS.GIPHY;

 /**
   * [fetchFromService a method to fetch data from the API]
   * @param  {[string || null]} keyword   [keyword of the query, optional]
   * @param  {[boolean]} randomSearch   [if the search is random or not]
   * @param  {[number]} limit           [limit for the query]
   * @return {[promise]}                [promise from the formatters]
   */
const fetchFromService = (keyword, randomSearch, limit) => {
  const url = serviceConfig.HOST
    + (randomSearch ? serviceConfig.RANDOMPATH : serviceConfig.SEARCHPATH);
  return Vue.http.get(url,
    { params: {
      api_key: serviceConfig.APIKEY,
      q: keyword,
      limit,
    } },
  ).then(response => giphyDataFormatter.formatResults(response, randomSearch),
  () => giphyDataFormatter.formatResults(null));
};


export default {
  /**
   * [get public method to be invoked from the outer service]
   * @param  {[string]} keyword  [keyword of the search query]
   * @param  {[number]} limit    [limit for the query]
   * @return {[promise]}         [promise from the formatters]
   */
  get(keyword, limit = serviceConfig.LIMIT) {
    // check if the search is random
    const randomSearch = !(keyword && keyword !== '');

    // if the search is random, Send the limit to the API itself
    // it will return a promise with the results limited to the number sent
    if (!randomSearch) {
      return fetchFromService(keyword, false, limit);
    }
    // Since Giphy API doesn't support limit on the random search
    // we hit the search by the sent limit from the controller
    // and we return a promise.all
    const promises = [];
    for (let i = 0; i < limit; i += 1) {
      promises.push(fetchFromService(null, true));
    }
    return Promise.all(promises);
  },
};

