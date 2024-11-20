import { create } from "zustand";
import { User } from "../../../../core/auth/interface/User";
import { authCheckStatus, authLogin, authLogout, authRegister } from "../../../../core/auth/actions/auth-actions";
import { SecureStorageAdapter } from "../../../config/helpers/adapter";

export type AuthStatus = 'checking' | 'not-authenticated' | 'authenticated';


export interface AuthState {
    status: AuthStatus,
    token?: string | null,
    user?: User | null,

    login: (email: string, password: string) => Promise<boolean>,
    register: (name: string, email: string, password: string,confirm_password:string) => Promise<void>,
    checkStatus: () => Promise<void>,
    logout: () => Promise<void>,

    changeStatus: (token?: string, user?: User) => Promise<boolean>,
}


export const useAuthStore = create<AuthState>((set, get) => ({
   status: 'checking',
   token: undefined,
   user: undefined,

   changeStatus: async (token?: string, user?: User) => {
      try{
      if (!token || !user) {
        set({ status: 'not-authenticated', token: undefined, user: undefined });
        await SecureStorageAdapter.deleteItem('token');
        return false;
      }
      set({status: 'authenticated',token: token,user: user});
      await SecureStorageAdapter.setItem('token', token);
      return true;
      } catch(error){
         console.log(error);
      }
    },
   login: async(email: string, password: string) => {
      try{
         const resp = await authLogin(email, password);
         await SecureStorageAdapter.setItem('token', resp.token);
         get().changeStatus(resp.token, resp.user);
         return true;
      }catch(error){
         console.error(error)
         return false;
      }
   },
   register: async(name: string, email: string, password: string,confirm_password:string) => {
   try{
      const resp = await authRegister(name,email, password,confirm_password);
      get().changeStatus(resp?.token, resp?.user);
   }catch(error){
      console.log(error);
   }
   },
   checkStatus: async () => {
      try{
      const resp = await authCheckStatus();
      if (!resp){
         get().changeStatus(undefined,undefined)
         console.log('no autenticado');
      }
      set({ status: 'authenticated', user: resp  });
      }catch(error){
         console.log(error);
         get().changeStatus(undefined, undefined);
      }
   },
   logout: async () => {
      try{
         await authLogout();
         SecureStorageAdapter.deleteItem('token');
         get().changeStatus(undefined, undefined);
      } catch (error) {
         console.log(error);
      }
   }
}));