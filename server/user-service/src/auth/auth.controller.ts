import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { User } from '@prisma/client'
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body(new ValidationPipe()) body: RegisterDto): Promise<User> {
        return this.authService.register(body);
    }

    @Post('login')
    async login(@Body() body: LoginDto): Promise<User> {
        return this.authService.login(body);
    }

    // @Get('get-all-user')
    // async getAllUser(): Promise<User[]> {
    //     return this.authService.getAllUser();
    // }

}
