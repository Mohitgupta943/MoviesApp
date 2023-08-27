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

// Search Movies
// Recieves {"searchterm":"String"}
router.post('/movies', (req, res) => {
    let favorite = new Favorite();
    favorite.postMovieFavorite(req.body, res);
});

// Search Series
// Recieves {"searchterm":"String"}
router.post('/series', (req, res) => {
    let favorite = new Favorite();
    favorite.postSeriesFavorite(req.body, res);
});

// Get Popular Movies
router.get('/movies', (req, res) => {
    let favorite = new Favorite();
    favorite.getMovieFavorite(req, res);
});

// Get Popular Series
router.get('/series', (req, res) => {
    let favorite = new Favorite();
    favorite.getSeriesFavorite(res);
});


api.use('/.netlify/functions/favorite', router);

module.exports.handler = serverless(api);