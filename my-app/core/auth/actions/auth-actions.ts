import { Api } from '../api/api';
import {User} from '../interface/User';
import { AuthUser } from '../interface/AuthUser';

export interface AuthResponse {
    token: string;
    user:  User;
}


const returnUserToken = (data: AuthResponse) => {
    const { token,user } = data;
    return {user,token};
}

const returnUsuario = (user: AuthUser) => {
    const { id, name, email,email_verified_at, created_at, updated_at } = user;
    return {id, name, email,email_verified_at, created_at, updated_at};
}


export const authLogin = async (email: string, password: string) => {
    try{
        email = email.toLowerCase();
        const response = await Api.post('/Auth/login', { email, password });
        const data =  response.data;
        if (response.status !== 200) {
            throw new Error(data.message);
        }
        return returnUserToken(data);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const authRegister = async (name: string, email: string, password: string,confirm_password:string) => {
    try {
        const response = await Api.post('/auth/register', { name, email, password,confirm_password });
        const data = response.data;
        if (response.status !== 201) {
            throw new Error(data.message);
        }
        return returnUserToken(data);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const authCheckStatus= async () => {
    try{
        const response = await Api.get('/user');
        const data = response.data;
        if (response.status !== 200) {
            console.error(data.message);
        }
        return returnUsuario(data);
    }catch(error){
        // console.error(error);
        throw error;
    }
}

export const authLogout = async () => {
    try{
    const response = await Api.post('/Auth/logout');
    const data = response.data;
    if (response.status !== 200) {
        throw new Error(data.message);
    }
    return true;
    } catch (error) {
        console.log(error);
        throw error;
    }
}