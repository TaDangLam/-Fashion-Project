import { Product } from '@prisma/client';

export interface ProductResponse {
    status: string;
    message: string;
    data?: Product | Product[];
}
