import { IsDateString, IsNumber, IsOptional, IsString, Min } from "class-validator"

export class newProductDto {
    @IsString()
    name: string

    @IsString()
    productCode: string

    @IsOptional()
    @IsString()
    size: string

    @IsNumber()
    @Min(0)
    price: number

    @IsOptional()
    @IsNumber()
    @Min(0)
    promotionPrice: number

    @IsOptional()
    @IsDateString()
    promotionStart: Date;
  
    @IsOptional()
    @IsDateString()
    promotionEnd: Date;

    @IsString()
    desc: string

    @IsString()
    categoryId: string
}

export class updateProductDto {
    name: string
}