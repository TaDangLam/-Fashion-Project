import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Brands } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { AddBrandDto, UpdateBrandDto } from 'src/brand/dtos/brand.dto';

@Injectable()
export class BrandService {
    constructor(private readonly prismaService: PrismaService) {}

    async getAllBrand(): Promise<Brands[]> {
        try {
            const data = await this.prismaService.brands.findMany();
            return data;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async addBrand(body: AddBrandDto): Promise<Brands> {
        try {
            const data = await this.prismaService.brands.create({
                data: body
            });
            return data;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async updateBrand(id: string, body: UpdateBrandDto): Promise<Brands> {
        try {
            const data = await this.prismaService.brands.update({
                where: { id },
                data: body
            });
            return data;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async deleteBrand(id: string): Promise<void> {
        try {
            await this.prismaService.brands.delete({ where: { id }});
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
