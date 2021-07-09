import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CaseModule } from './case/case.module';
import { DiagnoseModule } from './diagnose/diagnose.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.3bb5f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    ),
    UserModule,
    CaseModule,
    AuthModule,
    DiagnoseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
