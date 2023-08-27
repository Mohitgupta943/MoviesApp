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
let comment = new Comment();

// Posts Comments for a media id
// Recieves {"comment":"String","media_id":"Int"}
router.post('/postcomment', (req, res) => {
    comment.postComment(req.body, res);
});

// Get Comment for a media id
// Receives {"media_id":"Int"}
router.post('/getcomment', (req, res) => {
    comment.getComment(req.body, res);
});



api.use('/.netlify/functions/comment', router);

module.exports.handler = serverless(api);