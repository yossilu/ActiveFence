const TokenBucket = require('../tokenBucket/tokenBucket');
const redis = require('../redis/redis');

const DAY_IN_SECONDS = 86400;

const tokenBucketLimitRequests = (perSecond, maxBurst, expiration) => {
    const buckets = new Map();

    // Return an Express middleware function
    return limitRequestsMiddleware = async (req, res, next) => {
      const ip = (req.header('x-forwarded-for') || req.socket.remoteAddress);
      const relevantIp = ip.includes(':') ? ip.slice(2,3) : ip;
      const id = req.url + relevantIp
      const requests = await redis.incr(id);

      if (!buckets.has(relevantIp)) {
          buckets.set(relevantIp, new TokenBucket(maxBurst, perSecond, expiration));
      }

      let ttl;
        // on first request we set expire time to the ip(user)
      if(requests === 1) {
        await redis.expire(id, DAY_IN_SECONDS)
        ttl = DAY_IN_SECONDS;
      } else {
        ttl = await redis.ttl(id);
      }

      const bucketForIP = buckets.get(relevantIp);
      console.log(requests, bucketForIP.expiration, ttl)
      if(!!bucketForIP.expiration && requests > bucketForIP.expiration) {
        return res.status(503).json({
          response: 'error',
          maxLimitCalls: `reached max limit for your plan - ${bucketForIP.expiration} per second - ${requests}` ,
          ttl: Date(ttl)
        })
      }

      if (bucketForIP.take()) {
          next();
      } else {
          res.status(429).send('Client rate limit exceeded per second');
      }
    }
}


module.exports = { tokenBucketLimitRequests }



