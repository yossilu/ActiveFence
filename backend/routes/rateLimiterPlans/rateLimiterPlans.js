const express = require('express');
const router = express.Router();
const plansController = require('../../controllers/plansController');
const rateLimiter = require('../../rateLimiter/rateLimiter');

const PRO_LIMITATION = 12000;
const ENTERPRISE_LIMITATION = 0;
const FREE_LIMITATION = 5;

router.get('/token-bucket', rateLimiter.tokenBucketLimitRequests(1,1), plansController.tokenBucket);

router.get('/pro', rateLimiter.tokenBucketLimitRequests( 10, 20, PRO_LIMITATION ), plansController.pro);

router.get('/enterprise', rateLimiter.tokenBucketLimitRequests(100,120, ENTERPRISE_LIMITATION), plansController.enterprise);

router.get('/free', rateLimiter.tokenBucketLimitRequests(1,50, FREE_LIMITATION), plansController.free);

module.exports = router;