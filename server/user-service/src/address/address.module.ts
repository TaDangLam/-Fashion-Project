import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AddressController } from 'src/address/address.controller';
import { AddressService } from 'src/address/address.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AddressController],
  providers: [AddressService, JwtService, PrismaService]
})
export class AddressModule {}
