import redis from "redis";

const baseRedisClient = () => {
  return redis.createClient();
};

export const pusher = baseRedisClient();

export const subscriber = baseRedisClient();
