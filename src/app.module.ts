import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module'; // make sure this path is correct
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity'; 
import { Certificate } from './home/entity/certificate.entity';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',           
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'electrosteel',
      entities: [User, Certificate], 
      synchronize: true, // for dev only
      // synchronize: false,
      logging: true,
    }),
    UsersModule,
    AuthModule,
    HomeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
