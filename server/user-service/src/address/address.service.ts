import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { Address } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { newAddressDto, updateAddressDto } from 'src/address/dtos/address.dto';

@Injectable()
export class AddressService {
    constructor(private prismaService: PrismaService) {}

    async getAllAddressForUser(id: string): Promise<Address[]> {
        try {
            const data = await this.prismaService.address.findMany({
                where: { userId: id },
                include: {
                    user: {
                        select: {
                            email: true,
                            fullname: true,
                            phone: true
                        },
                    },
                },
            });
            return data;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getDetailAddress(id: string): Promise<Address> {
        try {
            const data = await this.prismaService.address.findUnique({
                where: { id }
            })
            return data;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async addAddress(id: string, body: newAddressDto): Promise<Address> {
        try {
            const { street, city, province } = body;
            const newAddress = await this.prismaService.address.create({
                data: {
                    street,
                    city,
                    province,
                    userId: id
                }
            });
            return newAddress;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async updateAddress(id: string, body: updateAddressDto): Promise<Address> {
        try {
            const oldAddress = await this.prismaService.address.findUnique({ where: { id }});
            if(!oldAddress) {
                throw new NotFoundException('Address is not exist');
            }
            const data = await this.prismaService.address.update({
                where: { id },
                data: body
            })
            return data;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async deleteAddress(id: string): Promise<any> {
        try {
            const address = await this.prismaService.address.findUnique({ where: { id }});
            if(!address) {
                throw new NotFoundException('Address is not exist');
            }
            await this.prismaService.address.delete({ where: { id }});
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
