import Server from '../sever.js';
const { API_KEY } = process.env;
class Favorite {

  constructor() {
    this.dbserver = new Server();
    this.dbserver.connectDB();
    this.API_KEY = API_KEY;
    this.BASE_URL = 'https://api.themoviedb.org/3';
    this.POPULAR_MOVIES_URL = this.BASE_URL + '/movie/popular?language=en-US&page=1&' + this.API_KEY;
    this.POPULAR_SERIES_URL = this.BASE_URL + '/tv/popular?language=en-US&page=1&' + this.API_KEY;
    this.IMG_URL = 'https://image.tmdb.org/t/p/w500';
    this.SEARCH_URL = this.BASE_URL + '/find/?' + this.API_KEY;
  }

  executeQuery(query, res) {
    this.dbserver.con.query(query, function (err, result) {
      if (err) {
        console.log(err.toString());
        res.status(500).send(err.toString());
      } else {
        console.log(result);
        console.log("Query Executed Successfully");
        res.send(result);
      }
    })
  }

  postFavorite(req, res) {
    let user_id = req.user_id;
    let media = JSON.stringify(req.media);
    console.log(media);
    let query = `INSERT INTO favorites (user_id, media) values ("${user_id}", "${media}");`
    this.executeQuery(query, res);
  };

  getFavorite(req, res) {
    let user_id = req.user_id;
    let favoriteList = [];
    let query = `SELECT media_id FROM favorites WHERE user_id="${user_id}";`
    this.dbserver.con.query(query, function (err, result) {
      if (err) {
        console.log(err.toString());
        res.status(500).send(err.toString());
      } else {
        console.log(result);
        result.forEach(addToList);

        function addToList(item) {
          // let url = this.SEARCH_URL + '&query=' + item.media_id;
          // fetch(url)
          //   .then((res) => res.json())
          //   .then((data) => {
          //     console.log("Successful");
          //     favoriteList.push(res);
          //   });
        }

        console.log("Query Executed Successfully");
        res.send(result);
      }
    })
    this.executeQuery(query, res);
  };

}

module.exports = Favorite