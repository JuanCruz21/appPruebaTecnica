import { Api } from '../../auth/api/api';
import {Category} from '../interfaces/category';


const returnCategory = (category: Category) => {
    const { id, name, description, created_at, updated_at } = category;
    return {id, name, description, created_at, updated_at};
}

export const indexCategory = async () => {
    try{
        const response = await Api.get('/v1/category');
        const data =  response.data;
        if (response.status !== 200) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}