const express = require('express');
const router = express.Router();
const axios = require('axios').default
const routes = require('./config.json');
const {redisClient, cacheMiddleware} = require('./redis');

const {REVIEWS, LISTINGS, ROOM, BOOKING} = routes;

router.get('/reviews/:id', (req, res, next) => { cacheMiddleware(req, res, next,'reviews') }, (req, res) => {
  axios.get(`${REVIEWS}/${req.params.id}`)
    .then((result) => {
      redisClient.hmset('reviews', req.params.id, JSON.stringify(result.data));
      res.status(200).send(result.data);
    })
})

router.get('/listings/:id', (req, res, next) => { cacheMiddleware(req, res, next,'listings') }, (req, res) => {
  axios.get(`${LISTINGS}/${req.params.id}`)
    .then((result) => {
      redisClient.hmset('listings', req.params.id, JSON.stringify(result.data));
      res.status(200).send(result.data);
    })
})

router.get('/room', (req, res, next) => { cacheMiddleware(req, res, next,'room') }, (req, res) => {
  axios.get(`${ROOM}/?id=${req.query.id}`)
    .then((result) => {
      redisClient.hmset('room', req.query.id, JSON.stringify(result.data));
      res.status(200).send(result.data);
    })
})

router.get('/booking', (req, res, next) => { cacheMiddleware(req, res, next,'booking') }, (req, res) => {
  axios.get(`${BOOKING}/?id=${req.query.id}`)
    .then((result) => {
      redisClient.hmset('booking', req.query.id, JSON.stringify(result.data));
      res.status(200).send(result.data);
    }) 
})

module.exports = router;