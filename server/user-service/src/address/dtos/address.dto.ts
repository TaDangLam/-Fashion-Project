import { IsNotEmpty } from "class-validator"

export class newAddressDto {
    @IsNotEmpty()
    street: string

    @IsNotEmpty()
    city: string

    @IsNotEmpty()
    province: string
}