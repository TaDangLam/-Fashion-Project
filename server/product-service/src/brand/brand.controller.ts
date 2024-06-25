import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Patch, Post } from '@nestjs/common';
import { BrandService } from 'src/brand/brand.service';
import { BrandsResponse } from 'src/common/interfaces/brand.inteface';
import { AddBrandDto, UpdateBrandDto } from 'src/brand/dtos/brand.dto';

@Controller('api/brand')
export class BrandController {
    constructor(private readonly brandService: BrandService) {}

    @Get('get-all')
    async getAllBrand(): Promise<BrandsResponse> {
        try {
            const data = await this.brandService.getAllBrand();
            return {
                status: 'OK',
                message: 'Get all brands is Successfully!!!',
                data
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post('add-brand')
    async addBrand(@Body() body: AddBrandDto): Promise<BrandsResponse> {
        try {
            const data = await this.brandService.addBrand(body);
            return {
                status: 'OK',
                message: 'Created brand is Successfully!!!',
                data
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Patch('update-brand/:id')
    async updateBrand(@Param('id') id: string, @Body() body: UpdateBrandDto): Promise<BrandsResponse> {
        try {
            const data = await this.brandService.updateBrand(id, body);
            return {
                status: 'OK',
                message: 'Updated brand is Successfully!!!',
                data
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Delete('delete-brand/:id')
    async deleteBrand(@Param('id') id: string): Promise<BrandsResponse> {
        try {
            await this.brandService.deleteBrand(id);
            return {
                status: 'OK',
                message: 'Deleted brand is Successfully!!!'
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
