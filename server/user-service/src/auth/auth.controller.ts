import { Body, Controller, Post, Get, Param, Patch, Delete, UseGuards, InternalServerErrorException, HttpCode, HttpStatus } from '@nestjs/common';

import { AuthService } from 'src/auth/auth.service';
import { LoginDto, RegisterDto, UpdateDto } from 'src/auth/dtos/auth.dto';
import { AuthResponse } from 'src/common/interfaces/auth-module/auth.interface';
import { AuthGuard } from 'src/common/guards/auth.guards';
import { Roles } from 'src/common/decorator/roles.decorator';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() body: RegisterDto): Promise<AuthResponse> {
        try {
            const user = await this.authService.register(body);
            return {
                status: 'OK',
                message: 'Register is Successfully!!!',
                data: user
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post('login')
    async login(@Body() body: LoginDto): Promise<AuthResponse> {
        try {
            const user = await this.authService.login(body);
            const { data, accessToken, refreshToken } = user;
            return {
                status: 'OK',
                message: 'Login is Successfully',
                data,
                accessToken,
                refreshToken
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('get-all-user')
    @Roles('admin')
    @UseGuards(AuthGuard)
    async getAllUser(): Promise<AuthResponse> {
        try {
            const data = await this.authService.getAllUser();
            return {
                status: 'OK',
                message: 'Get All User is Successfully',
                data,
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('get-detail/:id')
    @UseGuards(AuthGuard)
    @Roles('admin', 'staff', 'customer')
    async getDetailUser(@Param('id') id: string): Promise<AuthResponse> {
        try {
            const data = await this.authService.getDetailUser(id);
            return {
                status: 'OK',
                message: 'Get Detail User is Successfully',
                data,
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Patch('update-user/:id')
    @UseGuards(AuthGuard)
    async updateUser(@Param('id') id: string, @Body() body: UpdateDto): Promise<AuthResponse> {
        try {
            const data = await this.authService.updateUser(id, body);
            return {
                status: 'OK',
                message: 'Updated User is Successfully',
                data,
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Delete('delete-user/:id')
    @UseGuards(AuthGuard)
    @Roles('admin', 'staff')
    async deleteUser(@Param('id') id: string): Promise<AuthResponse> {
        try {
            await this.authService.deleteUser(id);
            return {
                status: 'OK',
                message: 'Deleted User is Successfully',
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
