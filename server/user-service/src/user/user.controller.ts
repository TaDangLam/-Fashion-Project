import { Controller, Get } from '@nestjs/common';

import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
    constructor (private readonly userService: UserService) {}

    @Get('get-all-user')
    getAllUser(): Promise<User[]> {
        return this.userService.getAllUser();
    }

        // @Get('get-all-user')
    // async getAllUser(): Promise<User[]> {
    //     return this.authService.getAllUser();
    // }
}
