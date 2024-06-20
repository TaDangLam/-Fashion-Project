import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { ProductService } from './product.service';
import { ProductResponse } from './interfaces/product.interface';

@Controller('api/product')
export class ProductController {
    constructor (private readonly productService: ProductService) {}

    @Get('get-all')
    async getAllUser(): Promise<ProductResponse> {
        // return this.productService.getAllUser();
        return;
    }

    @Get('get-detail/:id')
    async getDetailProduct(@Param('id') id: number): Promise<ProductResponse> {
        // return this.productService.getDetailProduct();
        return;
    }

    @Post('add-product')
    async addProduct(): Promise<ProductResponse> {
        // return this.productService.addProduct();
        return;
    }

    @Patch('update-product/:id')
    async updateProduct(): Promise<ProductResponse> {
        // return this.productService.updateProduct();
        return;
    }

    @Delete('update-product/:id')
    async deleteProduct(): Promise<ProductResponse> {
        // return this.productService.deleteProduct();
        return;
    }
}
