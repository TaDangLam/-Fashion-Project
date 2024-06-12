import { Injectable } from '@nestjs/common';

import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    constructor (private readonly prismaService: PrismaService) {}

    getAllUser = async(): Promise<User[]> => {
        return 
    }
    
    
}
