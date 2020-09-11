const redis = require('redis');

const REDIS_PORT = process.env.REDISPORT || 6379;

const redisClient = redis.createClient(REDIS_PORT);

const cacheMiddleware = (req, res, next, hash) => {
  const id = req.query.id || req.params.id;
  redisClient.hget(hash, id, (err, data) => {
    if (err) throw err;
    if (data !== null) {
      const jsoned = JSON.parse(data);
      res.status(200).send(jsoned);
    } else {
      next();
    }
  })
}

redisClient.on('connect', () => {
  console.log('connected to redis');
})


module.exports = { redisClient, cacheMiddleware };