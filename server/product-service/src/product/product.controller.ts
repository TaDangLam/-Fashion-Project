import { Body, Controller, Delete, Get, HttpCode, HttpStatus, InternalServerErrorException, Param, Patch, Post } from '@nestjs/common';

import { ProductService } from 'src/product/product.service';
import { ProductResponse } from 'src/common/interfaces/product.interface';
import { newProductDto, updateProductDto } from 'src/product/dtos/product.dto';

@Controller('api/product')
export class ProductController {
    constructor (private readonly productService: ProductService) {}

    @Get('get-all')
    @HttpCode(HttpStatus.OK)
    async getAllProduct(): Promise<ProductResponse> {
        try {
            const data = await this.productService.getAllProduct();
            return {
                status: 'OK',
                message: 'Get all product is Successfully!!!',
                data
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('get-detail/:id')
    @HttpCode(HttpStatus.OK)
    async getDetailProduct(@Param('id') id: string): Promise<ProductResponse> {
        try {
            const data = await this.productService.getDetailProduct(id);
            return {
                status: 'OK',
                message: 'Get detail product is Successfully!!!',
                data
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post('add-product')
    @HttpCode(HttpStatus.CREATED)
    async addProduct(@Body() body: newProductDto): Promise<ProductResponse> {
        try {
            const data = await this.productService.addProduct(body);
            return {
                status: 'OK',
                message: 'Get detail product is Successfully!!!',
                data
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Patch('update-product/:id')
    @HttpCode(HttpStatus.OK)
    async updateProduct(@Param('id') id: string, @Body() body: updateProductDto): Promise<ProductResponse> {
        try {
            const data = await this.productService.updateProduct(id, body);
            return {
                status: 'OK',
                message: 'Get detail product is Successfully!!!',
                data
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Delete('delete-product/:id')
    @HttpCode(HttpStatus.OK)
    async deleteProduct(@Param('id') id: string): Promise<ProductResponse> {
        try {
            await this.productService.deleteProduct(id);
            return {
                status: 'OK',
                message: 'Deleted product is Successfully!!!',
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }        
    }
}
