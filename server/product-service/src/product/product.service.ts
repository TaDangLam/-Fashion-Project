import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { newProductDto, updateProductDto } from 'src/product/dtos/product.dto';

@Injectable()
export class ProductService {
    constructor(private prismaService: PrismaService) {}

    async getAllProduct(): Promise<Product[]> {
        try {
            const data = await this.prismaService.product.findMany();
            return data;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getDetailProduct(id: string): Promise<Product> {
        try {
            const data = await this.prismaService.product.findUnique({
                where: { id },
                include: { 
                    images: true, 
                    category: {
                        select: {
                            id: true
                        }
                    } 
                }
            });
            return data;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async addProduct(body: newProductDto): Promise<Product> {
        try {
            const newProduct = await this.prismaService.product.create({
                data: {
                    name: body.name,
                    productCode: body.productCode,
                    size: body.size,
                    price: body.price,
                    promotionPrice: body.promotionPrice,
                    promotionStart: body.promotionStart ? new Date(body.promotionStart).toISOString() : null,
                    promotionEnd: body.promotionEnd ? new Date(body.promotionEnd).toISOString() : null,
                    desc: body.desc,
                    categoryId: body.categoryId,
                    brandId: body.brandId
                }
            });
            return newProduct;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateProduct(id: string, body: updateProductDto): Promise<Product>{
        try {
            const product = await this.prismaService.product.findUnique({ where: { id }});
            if(!product) {
                throw new NotFoundException('Product is not exist!');
            }
            const data = await this.prismaService.product.update({
                where: { id },
                data: {
                    name: body.name,
                    productCode: body.productCode,
                    size: body.size,
                    price: body.price,
                    promotionPrice: body.promotionPrice,
                    promotionStart: body.promotionStart ? new Date(body.promotionStart).toISOString() : null,
                    promotionEnd: body.promotionEnd ? new Date(body.promotionEnd).toISOString() : null,
                    desc: body.desc,
                    categoryId: body.categoryId,
                    brandId: body.brandId
                }
            })
            return data;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteProduct(id: string): Promise<any>{
        try {
            const product = await this.prismaService.product.findUnique({ where: { id }});
            if(!product) {
                throw new NotFoundException('Product is not exist!');
            }
            await this.prismaService.product.delete({ where: { id }});
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
