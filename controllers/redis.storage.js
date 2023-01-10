const Redis = require("ioredis");
require("dotenv").config();

const redis = new Redis({
  port: 11710,
  host: "redis-11710.c301.ap-south-1-1.ec2.cloud.redislabs.com",
  username: "default",
  password: process.env.REDIS_KEY,
});

module.exports = { redis };
