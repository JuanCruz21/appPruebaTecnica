import { create } from "zustand";
import { User } from "../../../../core/auth/interface/User";

export type AuthStatus = 'checking' | 'not-authenticated' | 'authenticated';


export interface AuthState {
    status: AuthStatus,
    token?: string | null,
    user?: User | null,
    errorMessage: string | null

    login: (email: string, password: string) => Promise<boolean>,
    register: (email: string, password: string) => Promise<boolean>,
    checkAuthentication: () => Promise<boolean>,
    logout: () => void,
}

export const AuthStore = create<AuthState>((set, get) => ({
    status: 'checking',
     token: undefined,
     user: undefined,
     errorMessage: null,

     login: async(email: string, password: string) => {
        return false;
     },
     register: async(email: string, password: string) => {
        return false;
     },
     checkAuthentication: async() => {
        return false;
     },
     logout: () => {
        return false;
     }
}) );