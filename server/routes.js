const express = require('express');
const router = express.Router();
const axios = require('axios').default
const routes = require('./config.json');
const {redisClient, cacheMiddleware} = require('./redis');

const {REVIEWS, LISTINGS, ROOM, BOOKING} = routes;

router.get('/reviews/:id', cacheMiddleware, (req, res) => {
  axios.get(`${REVIEWS}/${req.params.id}`)
    .then((result) => {
      redisClient.setex(req.url, 3600, JSON.stringify(result.data));
      res.status(200).send(result.data);
    })
})

router.get('/listings/:id', cacheMiddleware, (req, res) => {
  axios.get(`${LISTINGS}/${req.params.id}`)
    .then((result) => {
      redisClient.setex(req.url, 3600, JSON.stringify(result.data));
      res.status(200).send(result.data);
    })
})

router.get('/room', cacheMiddleware, (req, res) => {
  axios.get(`${ROOM}/?id=${req.query.id}`)
    .then((result) => {
      redisClient.setex(req.url, 3600, JSON.stringify(result.data));
      res.status(200).send(result.data);
    })
})

router.get('/booking', cacheMiddleware, (req, res) => {
  axios.get(`${BOOKING}/?id=${req.query.id}`)
    .then((result) => {
      redisClient.setex(req.url, 3600, JSON.stringify(result.data));
      res.status(200).send(result.data);
    }) 
})

module.exports = router;