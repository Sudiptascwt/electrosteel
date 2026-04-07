import { createClient, RedisClientType } from 'redis';

const redis: RedisClientType = createClient({
  url: 'redis://127.0.0.1:6379',
});

redis.on('connect', () => {
  console.log('Redis connected');
});

redis.on('error', (err: Error) => {
  console.error('Redis error:', err);
});

(async () => {
  await redis.connect();
})();

export default redis;
