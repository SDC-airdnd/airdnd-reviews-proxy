const redis = require('redis');

const REDIS_PORT = process.env.port || 6379;

const redisClient = redis.createClient(REDIS_PORT);

const cacheMiddleware = (req, res, next) => {
  const key = req.url;
  redisClient.get(key, (err, data) => {
    if (err) throw err;
    if (data !== null) {
      const jsoned = JSON.parse(data);
      res.status(200).send(jsoned);
    } else {
      next();
    }
  })
}


module.exports = { redisClient, cacheMiddleware };