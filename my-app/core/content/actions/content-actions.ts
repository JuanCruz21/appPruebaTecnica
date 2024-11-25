
import { Api } from '../../api/api';
import {Content} from '../interfaces/content';


const returnContent = (content: Content) => {
    const { id, title,  description,urldata,category_id,user_id, created_at, updated_at,favorite } = content;
    return {id, title,  description,urldata,category_id,user_id, created_at, updated_at,favorite};
}

export const indexContent = async (category_id:number, favorite:boolean) => {
    try{
        const response = await Api.get('/v1/content',{
            params: { category_id: category_id, favorite: favorite }, // Pasar parámetros en `params`
        });
        const data =  response.data;
        console.log(data);
        if (response.status !== 200) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const postContent = async (title:string,description:string,urldata:any,category_id:number,favorite:number) => {
    try{
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category_id", category_id.toString());
        formData.append("urldata", urldata);
        formData.append("favorite", favorite.toString());
        
        const response = await Api.post('/v1/content',formData);
        const data =  response.data;
        if (response.status !== 201) {
            throw new Error(response.data.message);
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
        console.log(data);
        if (response.status !== 200) {
            throw new Error(data.message);
        }
        return returnContent(data);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateContent = async (
    id: number,
    title: string,
    description: string,
    urldata: any,
    category_id: number,
    favorite: number = 0
  ) => {
      try {
        //   console.warn('Hola Aqui estoy:','ID', id, title, description, urldata, category_id, favorite ); // Depuración
  
        //   const formData = new FormData();
        //   formData.append("title", title);
        //   formData.append("description", description);
        //   formData.append("category_id", category_id.toString());
        //   formData.append("urldata", urldata);
        //   formData.append("favorite", favorite.toString()); 
  
        //   console.log("FormData:", formData);
          const response = await Api.put(`/v1/content/${id}`, {title,description,category_id,urldata,favorite});
          const data = response.data;
          if (response.status !== 200) {
              throw new Error(data.message);
          }
          return returnContent(data);
      } catch (error) {
          console.error("Error in updateContent:", error);
          throw error;
      }
  };

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
