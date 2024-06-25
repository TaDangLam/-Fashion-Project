import { Brands } from '@prisma/client';

export interface BrandsResponse {
    status: string;
    message: string;
    data?: Brands | Brands[];
}
