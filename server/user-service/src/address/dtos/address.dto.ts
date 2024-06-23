import { IsNotEmpty, IsOptional } from "class-validator"

export class newAddressDto {
    @IsNotEmpty()
    street: string

    @IsNotEmpty()
    city: string

    @IsNotEmpty()
    province: string
}

export class updateAddressDto {
    @IsOptional()
    street: string

    @IsOptional()
    city: string

    @IsOptional()
    province: string
}