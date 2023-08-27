import express, { Router } from 'express';
import { call } from 'function-bind';
import serverless from 'serverless-http';
import Comment from '../src/comment';
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
    let comment = new Comment();
    comment.postMovieComment(req.body, res);
});

// Search Series
// Recieves {"searchterm":"String"}
router.post('/series', (req, res) => {
    let comment = new Comment();
    comment.postSeriesComment(req.body, res);
});

// Get Popular Movies
router.get('/movies', (req, res) => {
    let comment = new Comment();
    comment.getMovieComment(req, res);
});

// Get Popular Series
router.get('/series', (req, res) => {
    let comment = new Comment();
    comment.getSeriesComment(res);
});


api.use('/.netlify/functions/comment', router);

module.exports.handler = serverless(api);