import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
// import { AuthResponse } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ) {}

    async register(data: RegisterDto): Promise<User> {
        try {
            const user = await this.prismaService.user.findUnique({ where: { email: data.email } });
            if (user) {
                throw new HttpException({ message: 'This email has been used' }, HttpStatus.BAD_REQUEST);
            }
            const hashPassword = bcrypt.hashSync(data.password, 10);
            const response = await this.prismaService.user.create({
                data: {
                    email: data.email,
                    fullname: data.fullname,
                    password: hashPassword,
                    confirmps: hashPassword,
                    phone: data.phone,
                    sex: data.sex,
                    dateOfBirth: new Date(data.dateOfBirth).toISOString(),
                }
            });
            return response;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(body: LoginDto): Promise<any> {
        try {
            const user = await this.prismaService.user.findUnique({ where: { email: body.email } });
            if (!user) {
                throw new HttpException({ message: 'This user does not exist!' }, HttpStatus.UNAUTHORIZED);
            }
            const verify = bcrypt.compareSync(body.password, user.password);
            if (!verify) {
                throw new HttpException({ message: 'Password is not correct!' }, HttpStatus.UNAUTHORIZED);
            }

            user.lastLogin = new Date();
            await this.prismaService.user.update({
                where: { id: user.id },
                data: { lastLogin: user.lastLogin }
            });

            const payload = { id: user.id, email: user.email, fullname: user.fullname, role: user.role };
            const accessToken = await this.jwtService.signAsync(payload, {
                secret: process.env.ACCESS_TOKEN_KEY,
                expiresIn: '1h'
            });
            const refreshToken = await this.jwtService.signAsync(payload, {
                secret: process.env.REFRESH_TOKEN_KEY,
                expiresIn: '30d'
            });

            const userWithoutPassword = {
                ...user,
                password: undefined,
                confirmps: undefined,
            };

            return {
                data: userWithoutPassword,
                accessToken,
                refreshToken
            };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllUser(): Promise<User[]> {
        try {
            const data = await this.prismaService.user.findMany({
                where: {
                    role: 'customer'
                }
            });
            return data;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getDetailUser(id: string): Promise<User> {
        try {
            const data = await this.prismaService.user.findUnique({
                where: {
                    id
                }
            });
            return data;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
