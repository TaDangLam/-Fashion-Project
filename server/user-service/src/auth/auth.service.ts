import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '@prisma/client';
import { LoginDto, RegisterDto, UpdateDto } from 'src/auth/dtos/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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
                expiresIn: process.env.EXPIRESIN_ACCESS_TOKEN
            });
            const refreshToken = await this.jwtService.signAsync(payload, {
                secret: process.env.REFRESH_TOKEN_KEY,
                expiresIn: process.env.EXPIRESIN_REFRESH_TOKEN
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
                where: { role: 'customer' },
                include: { address: true },
            });
            return data;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getDetailUser(id: string): Promise<User> {
        try {
            const data = await this.prismaService.user.findUnique({
                where: { id }
            });
            if (!data) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            return data;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateUser(id: string, body: UpdateDto): Promise<User> {
        try {
            const user = await this.prismaService.user.findUnique({
                where: { id }
            });
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }

            const data: any = {};
            if(body.fullname && body.fullname !== user.fullname) {
                data.fullname = body.fullname;
            }
            if(body.password && body.password !== user.password) {
                data.password = bcrypt.hashSync(body.password, 10);
            }
            if(body.confirmps && body.confirmps !== user.confirmps) {
                data.confirmps = bcrypt.hashSync(body.confirmps, 10);
            }
            if(body.phone && body.phone !== user.phone){
                data.phone = body.phone;
            }
            if (body.dateOfBirth && body.dateOfBirth !== user.dateOfBirth) {
                data.dateOfBirth = new Date(body.dateOfBirth).toISOString();
            }
            if (body.avatar && body.avatar !== user.avatar) {
                data.avatar = body.avatar;
            }
            if (body.sex !== undefined && body.sex !== user.sex) {
                data.sex = body.sex;
            }
            const updateUser = await this.prismaService.user.update({
                where: { id },
                data
            })
            return updateUser;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteUser(id: string): Promise<User> {
        try {
            const user = await this.prismaService.user.findUnique({
                where: { id }
            });
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            // const data = await this.prismaService.user.update({
            //     where: { id },
            //     data: {
            //         statusAccount: 'Deleted'
            //     }
            // })
            const data = await this.prismaService.user.delete({
                where: { id },
            })
            return data;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
