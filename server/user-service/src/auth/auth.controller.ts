import { Body, Controller, Post, HttpException, HttpStatus, Res, Get, Param } from '@nestjs/common';
// import { User } from '@prisma/client';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

import { AuthResponse } from './interfaces/auth.interface';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Res() res: Response, @Body() body: RegisterDto): Promise<AuthResponse> {  // Use the interface as return type
        try {
            const user = await this.authService.register(body);
            const response: AuthResponse = {
                status: 'OK',
                message: 'Register is Successfully!!!',
                data: user
            };
            res.status(HttpStatus.CREATED).json(response);
            return response;
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('login')
    async login(@Body() body: LoginDto, @Res() res: Response): Promise<AuthResponse> {
        try {
            // return await this.authService.login(body);
            const user = await this.authService.login(body);
            const { data, accessToken, refreshToken } = user;
            const response: AuthResponse = {
                status: 'OK',
                message: 'Login is Successfully',
                data,
                accessToken,
                refreshToken
            }

            res.status(HttpStatus.OK).json(response);
            return response;
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
   
    @Get('get-all-user')
    async getAllUser(@Res() res: Response): Promise<AuthResponse> {
        try {
            const data = await this.authService.getAllUser();
            const response: AuthResponse = {
                status: 'OK',
                message: 'Get All User is Successfully',
                data,
            }
            res.status(HttpStatus.OK).json(response);
            return response
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async getDetailUser(@Param('id') id: string, @Res() res: Response): Promise<AuthResponse> {
        try {
            const data = await this.authService.getDetailUser(id);
            const response: AuthResponse = {
                status: 'OK',
                message: 'Get Detail User is Successfully',
                data,
            }
            res.status(HttpStatus.OK).json(response);
            return response;
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
