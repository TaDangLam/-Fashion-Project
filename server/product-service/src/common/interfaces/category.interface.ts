import { Category } from '@prisma/client';

export interface CategoryResponse {
    status: string;
    message: string;
    data?: Category | Category[];
}
