import { Sex } from "@prisma/client"
import { IsDateString, IsEmail, IsEnum, IsNotEmpty, Matches, MinLength } from "class-validator"

export class RegisterDto {
    @IsEmail()
    email: string
    
    @IsNotEmpty()
    fullname: string

    @MinLength(6)
    password: string

    @MinLength(6)
    confirmps: string

    @Matches(/^(\+84|84|0)(3|5|7|8|9|1[2|6|8|9])[0-9]{8}$/)
    phone: string

    @IsEnum(Sex)
    sex: Sex

    @IsDateString()
    dateOfBirth: Date
}

export class LoginDto {
    @IsEmail()
    email: string

    @MinLength(6)
    password: string
}