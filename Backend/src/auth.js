import Server from '../sever.js'; 

class Auth {

    constructor() {
        this.dbserver= new Server()
        this.dbserver.connectDB()
        this.API_KEY = 'api_key=2e65e5f5c5ba081b6ec96ea651bafe73';
        this.Request_API_URL = 'https://api.themoviedb.org/3/authentication/token/new?'
        this.CREATE_SESSION_ID_URL='https://api.themoviedb.org/3/authentication/session/new?'
        console.log("req url "+this.Request_API_URL+this.API_KEY)

       
    }

    loginUser(req,res){

        console.log("login "  + " " + req.username + " " + req.password+" "+ req.email)
        let pass = req.password
        let email = req.email
        let query=`select * from users where email="${email}" and pass="${pass}"`
        this.dbserver.con.query(query, function (err, result) {
            if (err) {
              console.log("error while login "+err.toString());
              res.status(500).send(err.toString());
            } else {
               result=JSON.parse(JSON.stringify(result))
            //   console.log(result+" "+result.body)
            //   
              if(result !=null && result.length==1){
                console.log("result "+result.length+" "+result[0].email+" "+result[0].id)
                res.send({"response" : "success"})
                
              }else{
                res.send({"response" : "fail"})
              }
              
            }
          })    


    }

    createUser(req, res) {
        console.log("server " + req + " " + req.username + " " + req.password)
        let userName = req.username
        let pass = req.password
        let email = req.email
        console.log("server " + req + " " + userName + " " + pass)
        let query_st = `insert into users (username,email,pass) values ("${userName}","${email}","${pass}");`
        this.addUser(query_st,res)
    }

    addUser(query,res) {
        console.log("adding user to db")
        this.dbserver.con.query(query, function (err, result) {
              if (err) {
                console.log(err.toString());
                res.status(500).send(err.toString());
              } else {
                console.log(result)
                this.userId= result.insertId
                console.log("user created "+ result.insertId) 
                res.send(result)
              }
            })          
    }

   
    createSessionId(){
        console.log("creating sessionId")
        const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              Authorization: 'Bearer 2e65e5f5c5ba081b6ec96ea651bafe73'
            }
          };
          
          fetch(this.CREATE_SESSION_ID_URL, options)
            .then((res) => res.json())
            .then((data) => {
                console.log("session = "+data.session_id)
                res.send(data)
            }
            )
            .catch(err => console.error('error:' + err));

    }

   
    getAllUser(res) {
        var query = this.con.query('SELECT * from Users', function (err, result) {
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
module.exports = Auth