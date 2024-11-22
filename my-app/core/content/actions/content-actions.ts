
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

export const postContent = async (title:string,description:string,urldata:any,category_id:number) => {
    try{
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category_id", category_id.toString());
        formData.append("urldata", urldata);
        
        const response = await Api.post('/v1/content',formData);
        const data =  response.data;
        console.log(data);
        if (response.status !== 200) {
            console.error(data.message);
            throw new Error(data.message);
        }
        return returnContent(data);
    } catch (error) {
        console.error(error.response.data.message);
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
