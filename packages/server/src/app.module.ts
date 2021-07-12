import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CaseModule } from './case/case.module';
import { DiagnoseModule } from './diagnose/diagnose.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UserModule,
    CaseModule,
    AuthModule,
    DiagnoseModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
