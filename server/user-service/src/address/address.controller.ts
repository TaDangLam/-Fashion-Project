import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { AddressService } from 'src/address/address.service';
import { AddressResponse } from 'src/common/interfaces/address-module/address.interface';
import { newAddressDto, updateAddressDto } from 'src/address/dtos/address.dto';
import { AuthGuard } from 'src/common/guards/auth.guards';
import { Roles } from 'src/common/decorator/roles.decorator';

@Controller('api/address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Get('get-all')
    @UseGuards(AuthGuard)
    @Roles('admin', 'staff', 'customer')
    async getAllAddressForUser(@Req() req: Request | any): Promise<AddressResponse> {
        try {
            const { id } = req.user;
            const data = await this.addressService.getAllAddressForUser(id);
            return {
                status: 'OK',
                message: 'Get All Address for User is Successfully!!!',
                data
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('get-detail/:id')
    @UseGuards(AuthGuard)
    @Roles('admin', 'staff', 'customer')
    async getDetailAddress(@Param('id') id: string): Promise<AddressResponse> {
        try {
            const data = await this.addressService.getDetailAddress(id);
            return {
                status: 'OK',
                message: 'Get Detail Address is Successfully!!!',
                data
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post('add-address')
    @UseGuards(AuthGuard)
    @Roles('admin', 'staff', 'customer')
    async addAddress(@Body() body: newAddressDto, @Req() req: Request | any): Promise<AddressResponse> {
        try {
            const { id } = req.user;
            const data = await this.addressService.addAddress(id, body);
            return {
                status: 'OK',
                message: 'Add New Address is Successfully!!!',
                data
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Patch('update-address/:id')
    @UseGuards(AuthGuard)
    @Roles('admin', 'staff', 'customer')
    async updateAddress(@Param('id') id: string, @Body() body: updateAddressDto): Promise<AddressResponse> {
        try {
            const data = await this.addressService.updateAddress(id, body);
            return {
                status: 'OK',
                message: 'Updated Address is Successfully!!!',
                data
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Delete('delete-address/:id')
    async deleteAddress(@Param('id') id: string): Promise<AddressResponse> {
        try {
            await this.addressService.deleteAddress(id);
            return {
                status: 'OK',
                message: 'Deleted Address is Successfully!!!'
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
