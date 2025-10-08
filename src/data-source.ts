import 'dotenv/config';
import { DataSource } from 'typeorm';
import { ActivityLogSubscriber } from './common/activity-logs/activity-log.subscriber'; 

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['src/entity/*.ts'],
  migrations: ['src/migrations/*.ts'],
  subscribers: [ActivityLogSubscriber],
  synchronize: false,
});
