import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {
    constructor(private prismaService: PrismaService) {}

    async getAllUser(): Promise<Product[]> {
        try {
            return ;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getDetailProduct(): Promise<Product> {
        try {
            return
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async addProduct(): Promise<Product>{
        try {
            return;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateProduct(): Promise<Product>{
        try {
            return;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteProduct(): Promise<Product>{
        try {
            return;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
