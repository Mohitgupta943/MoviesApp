import express, { Router } from 'express';
import { call } from 'function-bind';
import serverless from 'serverless-http';
import Favorite from '../src/favorite';
let api = express();
api.use(express.json())
api.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
const router = express.Router();
let favorite = new Favorite();

// Posts Favorites for a user id
// Recieves {"user_id":"Int","media":"JSON"}
router.post('/postfavorites', (req, res) => {
    favorite.postFavorite(req.body, res);
});

// Get Favorites for a user id
// Receives {"user_id":"Int"}
router.post('/getfavorites', (req, res) => {
    favorite.getFavorite(req.body, res);
});


api.use('/.netlify/functions/favorite', router);

module.exports.handler = serverless(api);