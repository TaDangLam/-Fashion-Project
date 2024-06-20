import { PrismaClient } from "@prisma/client";
import { Injectable, OnModuleInit } from "@nestjs/common";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        try {
            await this.$connect()
        } catch (error) {
            console.error('Failed to connect to the database', error);
        }
    }
}