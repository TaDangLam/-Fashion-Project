import { User } from '@prisma/client';

export interface AuthResponse {
    status: string;
    message: string;
    data?: User | User[];
    accessToken?: string;
    refreshToken?: string;
}