import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { Address } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { newAddressDto } from 'src/address/dtos/address.dto';

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

    async getDetailAddress(id: number): Promise<Address> {
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

    async updateAddress() {
        try {
            
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async deleteAddress() {
        try {
            
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
