import Server from '../sever.js';

class Comment {

  constructor() {
    this.dbserver = new Server();
    this.dbserver.connectDB();
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

  postComment(req, res) {
    let comment = req.comment;
    let media_id = req.media_id;
    let query = `INSERT INTO comments (media_id, comment) values ("${media_id}", "${comment}");`
    this.executeQuery(query, res);
  };

  getComment(req, res) {
    let media_id = req.media_id;
    let query = `SELECT comment FROM comments WHERE media_id="${media_id}";`
    this.executeQuery(query, res);
  };

}

module.exports = Comment