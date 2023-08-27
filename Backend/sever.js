class Server {

  constructor() {
    this.mysql = require('mysql');
    const express = require("express")
    const app = express();
    app.use(express.json());
    this.con = NaN;
    this.connectDB();
  }



  connectDB() {
    this.con = this.mysql.createConnection({
      host: "db4free.net",
      database: "movies_app_db",
      user: "tmdb_user",
      password: "midb@1234"
    });
    this.con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
    });
  }

  callUser(res) {

    var query = this.con.query('SELECT * from users', function (err, result) {
      if (err) {
        console.log(err.toString());
        res.status(500).send(err.toString());
      } else {
        console.log(result)
        res.json(result);

      }
    });
  }


  addUser(req, res) {
    console.log("server " + req + " " + req.username + " " + req.password)
    let userName = req.username
    let pass = req.password
    let email = req.email
    console.log("server " + req + " " + userName + " " + pass)
    let query_st = `insert into users (username,email,pass) values ("${userName}","${email}","${pass}")`
    var query = this.con.query(query_st, function (err, result) {
      if (err) {
        console.log(err.toString());
        res.status(500).send(err.toString());
      } else {
        console.log(result)
        res.json(result);

      }
    });
  }
}
module.exports = Server

