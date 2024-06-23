import { Address } from "@prisma/client";

export interface AddressResponse {
    status: string,
    message: string,
    data?: Address | Address[]
}