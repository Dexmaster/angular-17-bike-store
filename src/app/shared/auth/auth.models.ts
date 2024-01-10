export type UserAuth = {
    email: string;
    password: string;
}

export type User = UserAuth & {
    name: string;
};

export interface AuthResponse {
    accessToken: string;
    user: User;
}