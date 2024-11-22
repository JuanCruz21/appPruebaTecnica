
import { Api } from '../../api/api';
import {Content} from '../interfaces/content';


const returnContent = (content: Content) => {
    const { id, title,  description,urldata,category_id,user_id, created_at, updated_at } = content;
    return {id, title,  description,urldata,category_id,user_id, created_at, updated_at};
}

export const indexContent = async () => {
    try{
        const response = await Api.get('/v1/content');
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

export const postContent = async (content:Content) => {
    try{
        const response = await Api.post('/v1/content',content);
        const data =  response.data;
        if (response.status !== 200) {
            throw new Error(data.message);
        }
        return returnContent(data);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const showContent = async (id: number) => {
    try{
        const response = await Api.get(`/v1/content/${id}`);
        const data =  response.data;
        if (response.status !== 200) {
            throw new Error(data.message);
        }
        return returnContent(data);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateContent = async (id: number,content:Content) => {
    try{
        const response = await Api.put(`/v1/content/${id}`,content);
        const data =  response.data;
        if (response.status !== 200) {
            throw new Error(data.message);
        }
        return returnContent(data);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteContent = async (id: number) => {
    try{
        const response = await Api.delete(`/v1/content/${id}`);
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
