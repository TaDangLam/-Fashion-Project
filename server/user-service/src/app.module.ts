import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
// import { APP_PIPE } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [AuthModule, PrismaModule, AddressModule],
  // controllers: [AppController],
  // providers: [{
  //   provide: APP_PIPE,
  //   useClass: ValidationPipe,
  // }],
})
export class AppModule {}
