import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { AddCateDto, UpdateCateDto } from 'src/category/dtos/category.dto';

@Injectable()
export class CategoryService {
    constructor(private prismaService: PrismaService) {}

    async getAllCategory(): Promise<Category[]> {
        try {
            const data = await this.prismaService.category.findMany({
                include: {
                    parent: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    child: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    product: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            });
            return data;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async addCategory(body: AddCateDto): Promise<Category> {
        try {
            const data = await this.prismaService.category.create({
                data: body
            })
            return data;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async updateCategory(id: string, body: UpdateCateDto): Promise<Category> {
        try {
            const category = await this.prismaService.category.findUnique({ where: { id }});
            if(!category) {
                throw new NotFoundException('Category is not exist!');
            }
            const data = await this.prismaService.category.update({
                where: { id },
                data: body
            })
            return data;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async deleteCategory(id: string): Promise<void> {
        try {
            const category = await this.prismaService.category.findUnique({ where: { id }});
            if(!category) {
                throw new NotFoundException('Category is not exist!');
            }
            await this.prismaService.category.delete({
                where: { id }
            })
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
