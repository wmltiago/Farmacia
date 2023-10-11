import { AxiosError } from "axios";

export const erroInterceptor = (error: AxiosError) =>{
    
    if(error.message === "Network Error"){
        return Promise.reject(new Error("Erro de conexão."))
    }

    if(error.response?.status === 401){
        //falta config erro de retorno do back
    }

    return Promise.reject(error);

};