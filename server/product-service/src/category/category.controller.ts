import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Patch, Post } from '@nestjs/common';

import { CategoryService } from 'src/category/category.service';
import { CategoryResponse } from 'src/common/interfaces/category.interface';
import { AddCateDto, UpdateCateDto } from 'src/category/dtos/category.dto';

@Controller('api/category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get('get-all')
    async getAllCategory(): Promise<CategoryResponse> {
        try {
            const data = await this.categoryService.getAllCategory();
            return {
                status: 'OK',
                message: 'Get all category is Successfully!!!',
                data
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post('add-category')
    async addCategory(@Body() body: AddCateDto): Promise<CategoryResponse> {
        try {
            const data = await this.categoryService.addCategory(body);
            return {
                status: 'OK',
                message: 'Created category is Successfully!!!',
                data
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Patch('update-category/:id')
    async updateCategory(@Param('id') id: string, @Body() body: UpdateCateDto): Promise<CategoryResponse> {
        try {
            const data = await this.categoryService.updateCategory(id, body);
            return {
                status: 'OK',
                message: 'Updated category is Successfully!!!',
                data
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Delete('delete-category/:id')
    async deleteCategory(@Param('id') id: string): Promise<CategoryResponse> {
        try {
            await this.categoryService.deleteCategory(id);
            return {
                status: 'OK',
                message: 'Updated category is Successfully!!!'
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
