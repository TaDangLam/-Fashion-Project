import { IsOptional, IsString } from "class-validator"

export class AddCateDto {
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    parentId: string
}

export class UpdateCateDto {
    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    parentId: string
}