import redis from './redisClient';

interface EmailJob {
  email: string;
  subject: string;
}

async function addEmailJob(job: EmailJob): Promise<void> {
  await redis.lPush('emailQueue', JSON.stringify(job));
  console.log('📨 Job added:', job);
}

(async () => {
  await addEmailJob({ email: 'dev2.scwt@gmail.com', subject: 'Welcome' });
  await addEmailJob({ email: 'dev2.scwt@gmail.com', subject: 'Hello' });
})();
