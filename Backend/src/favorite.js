import { dbConnection, executeQuery } from '../connections.js'
import Constants from '../constants.js'
const { API_KEY } = process.env;

class Favorite {

  constructor() {
    this.API_KEY = API_KEY;
    this.BASE_URL = 'https://api.themoviedb.org/3';
    this.POPULAR_MOVIES_URL = this.BASE_URL + '/movie/popular?language=en-US&page=1&' + this.API_KEY;
    this.POPULAR_SERIES_URL = this.BASE_URL + '/tv/popular?language=en-US&page=1&' + this.API_KEY;
    this.IMG_URL = 'https://image.tmdb.org/t/p/w500';
    this.SEARCH_URL_MOVIE = this.BASE_URL + '/search/movie?' + this.API_KEY;
    this.SEARCH_URL_TV = this.BASE_URL + '/search/tv?' + this.API_KEY;
  }

  postMovieFavorite(req, res) {
    let key = req.searchterm;
    let url = this.SEARCH_URL_MOVIE + '&query=' + key;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("Successful");
        res.send(data);
      });
  };

  postSeriesFavorite(req, res) {
    let key = req.searchterm;
    let url = this.SEARCH_URL_TV + '&query=' + key;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("Successful");
        res.send(data);
      });
  };

  getMovieFavorite(req, res) {
    let url = this.POPULAR_MOVIES_URL;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("Successful");
        res.send(data);
      });
  };

  getSeriesFavorite(res) {
    let url = this.POPULAR_SERIES_URL;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("Successful");
        res.send(data);
      });
  };

}

module.exports = Favorite