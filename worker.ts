import redis from './redisClient';

interface EmailJob {
  email: string;
  subject: string;
}

async function startWorker(): Promise<void> {
  console.log('📡 Email worker started...');

  while (true) {
    // BRPOP blocks until a job is available
    const result = await redis.brPop('emailQueue', 0);

    if (!result) continue;

    const job: EmailJob = JSON.parse(result.element);

    console.log(`✉️ Sending email to ${job.email} with subject "${job.subject}"`);

    // TODO: integrate nodemailer here
  }
}

startWorker();
