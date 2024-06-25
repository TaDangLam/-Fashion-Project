import { IsDateString, IsNumber, IsOptional, IsString, Min } from "class-validator"

export class newProductDto {
    @IsString()
    name: string

    @IsString()
    productCode: string

    @IsOptional()
    @IsString()
    size: string

    @IsOptional()
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

    @IsString()
    brandId: string
}

export class updateProductDto {
    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    productCode: string

    @IsOptional()
    @IsString()
    size: string

    @IsOptional()
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

    @IsOptional()
    @IsString()
    desc: string

    @IsOptional()
    @IsString()
    categoryId: string

    @IsOptional()
    @IsString()
    brandId: string
}