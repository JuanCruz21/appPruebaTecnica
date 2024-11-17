import {User} from '../interface/User';

export interface AuthResponse {
    id: number,
    name: string,
    email: string,
    isActive: boolean,
    token: string,
}

const returnUserToken = (data: AuthResponse) => {
    const { id,token,email,name,isActive } = data;
    const user: User = {
        id,
        name,
        email,
        isActive,
    };
    return {user,token};
}

export default returnUserToken;

export const authLogin = async (email: string, password: string) => {
    const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.status !== 200) {
        throw new Error(data.message);
    }
    return returnUserToken(data);
}

export const authRegister = async (name: string, email: string, password: string) => {
    const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    if (response.status !== 201) {
        throw new Error(data.message);
    }
    return returnUserToken(data);
}