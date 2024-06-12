import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
// import { APP_PIPE } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, PrismaModule],
  // controllers: [AppController],
  // providers: [{
  //   provide: APP_PIPE,
  //   useClass: ValidationPipe,
  // }],
})
export class AppModule {}
