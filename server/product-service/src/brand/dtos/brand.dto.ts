import { IsOptional, IsString } from "class-validator"

export class AddBrandDto {
    @IsString()
    name: string
}

export class UpdateBrandDto {
    @IsOptional()
    @IsString()
    name: string
}