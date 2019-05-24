const redis = require("redis");

const redisClient = redis
  .createClient(process.env.REDIS_PORT, process.env.REDIS_HOST)
  .on("connect", () => {
    console.log("Redis client connected.");
  })
  .on("error", err => {
    console.error("Something went wrong " + err);
  });

module.exports = redisClient;
