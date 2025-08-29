import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Certificate } from './home/entity/certificate.entity';
import { Banner } from './home/entity/banner.entity';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { BannerModule } from './home/banner/banner.module';
import { Investor } from './home/entity/investor.entity';
import { InvestorModule } from './home/investor/investor.module';
import { CareModule } from './home/cares/care.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'electrosteel',
      entities: [User, Certificate, Banner, Investor], 
      synchronize: true, // only for dev
      logging: true,
    }),
    UsersModule,
    AuthModule,
    HomeModule,
    BannerModule,
    InvestorModule,
    CareModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
