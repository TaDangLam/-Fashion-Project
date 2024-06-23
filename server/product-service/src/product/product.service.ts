import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { newProductDto, updateProductDto } from 'src/product/dtos/product.dto';

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

    async getDetailProduct(id: string): Promise<Product> {
        try {
            const data = await this.prismaService.product.findUnique({ where: { id }});
            return data;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async addProduct(body: newProductDto): Promise<Product>{
        try {
            // const { name, productCode, size, price, promotionPrice, promotionStart, promotionEnd, desc, categoryId } = body;
            // const newProduct = await this.prismaService.product.create({
            //     data: {
            //         name,
            //         productCode,
            //         size,
            //         price,
            //         promotionPrice,
            //         promotionStart,
            //         promotionEnd,
            //         desc,
            //         categoryId
            //     }
            // })
            return ;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateProduct(id: string, body: updateProductDto): Promise<Product>{
        try {
            return;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteProduct(id: string): Promise<Product>{
        try {
            return;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
