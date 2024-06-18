import { JwtService } from '@nestjs/jwt';
import { Injectable, CanActivate, ExecutionContext, ForbiddenException, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { Observable } from 'rxjs';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext,): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const token = request.headers.authorization;
    if(!token) {
      throw new ForbiddenException('Please provide token.');
    }
    
    const accessToken = token.split(' ')[1];
    let payload;

    try { // check token is expired
      payload = await this.jwtService.verifyAsync(accessToken, { secret: process.env.ACCESS_TOKEN_KEY });
    } catch (error) {
      throw new ForbiddenException('Invalid token or expired');
    }

    const user = await this.prismaService.user.findUnique({ where: { id: payload.id }});
    if(!user) {
      throw new BadRequestException('User not belong to token, try again!');
    }
    if (roles && !roles.includes(user.role)) {
      throw new ForbiddenException('You do not have permission to perform this action.');
    }
    request.user = user;
    return true;
  }
}