import express, { Router } from 'express';
import { call } from 'function-bind';
import serverless from 'serverless-http';
import GetList from '../src/getlist';
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
    let getLists = new GetList();
    getLists.getMovies(req.body, res);
});

// Search Series
// Recieves {"searchterm":"String"}
router.post('/series', (req, res) => {
    let getLists = new GetList();
    getLists.getSeries(req.body, res);
});

// Get Popular Movies
router.get('/popularmovies', (req, res) => {
    let getLists = new GetList();
    getLists.getPopularMovies(req, res);
});

// Get Popular Series
router.get('/popularseries', (req, res) => {
    let getLists = new GetList();
    getLists.getPopularSeries(res);
});

// Get Movie Trailers
// Recieves {"searchterm":"String"}
router.post('/movietrailers', (req, res) => {
    let getLists = new GetList();
    getLists.getMovieTrailers(req.body, res);
});

// Get TV Trailers
// Recieves {"searchterm":"String"}
router.post('/tvtrailers', (req, res) => {
    let getLists = new GetList();
    getLists.getTVTrailers(req.body, res);
});


api.use('/.netlify/functions/getlist', router);

module.exports.handler = serverless(api);