import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
// import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [AuthModule, UserModule],
  // controllers: [AppController],
  // providers: [{
  //   provide: APP_PIPE,
  //   useClass: ValidationPipe,
  // }],
})
export class AppModule {}
