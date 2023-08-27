//User related logic

import express, { Router } from 'express';
import { call } from 'function-bind';
import serverless from 'serverless-http';
import Auth from '../src/auth.js'

let api = express();
api.use(express.json()) 
const router = express.Router();
let userService= new Auth()
router.post('/signup', (req, res) =>{
    //let j=JSON.parse(JSON.stringify(req.body))
    let jsonReq=req.body
    console.log("geting data "+jsonReq+" "+" "+jsonReq.username)
   
    userService.createUser(jsonReq,res)
    //userService.createToken(res)
    //userService.createSessionId()

}
 );

router.post('/login', (req, res) =>{
    let jsonReq=req.body
    console.log("geting data "+jsonReq+" "+" "+jsonReq.username)
    userService.loginUser(jsonReq,res)
    //userService.createToken(res)
    //userService.createSessionId()

}
 );

api.use('/.netlify/functions/account', router);

module.exports.handler = serverless(api);