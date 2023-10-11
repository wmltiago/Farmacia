import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IListagemPessoa {
    id: number;
    nomeCompleto: string;
    email: string;
    cidadeId: number;
}

export interface IDetalhePessoa {
    id: number;
    nomeCompleto: string;
    email: string;
    cidadeId: number;
}


type TpessoasComTotalCount = {
    data: IListagemPessoa[];
    totalCount: number;
}

/**
 * Busca paginada dos registro de pessoa
 */
const getAll = async (page = 1, filter = ""): Promise<TpessoasComTotalCount | Error> => {
    try {
        const urlRelativa = `/pessoas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}` //limita 10 consultas a 1 pagina

        const { data, headers } = await Api.get(urlRelativa);

        if (data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
            };
        }

        return new Error("Erro ao listar os registros.");

    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao listar os registros.");
    }
};

const getById = async (id: number): Promise<IDetalhePessoa | Error> => { 
    try {   
    const { data } = await Api.get(`/pessoas/${id}`);

    if (data) {
        return data 
    }

    return new Error("Erro ao consultar o registro.");

} catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Erro ao consultar o registro.");
}
};

const create = async (dados: Omit<IDetalhePessoa, 'id'>): Promise<number | Error> => {
    try {   
        const { data } = await Api.post<IDetalhePessoa>('/pessoas/', dados);
    
        if (data) {
            return data.id;
        }
    
        return new Error("Erro ao criar o registro.");
    
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao criar o registro.");
    }
 };

const upDateById = async (id: number, dados: IDetalhePessoa): Promise<void | Error> => {
    try {   
         await Api.put(`/pessoas/${id}`, dados);
       
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao atualizar o registro.");
    }
 };

const deleteById = async (id: number): Promise<any> => { 
    try {   
        await Api.delete(`/pessoas/${id}`);
      
   } catch (error) {
       console.error(error);
       return new Error((error as { message: string }).message || "Erro ao apagar o registro.");
   }
};


export const PessoasService = {
    getAll,
    getById,
    create,
    upDateById,
    deleteById,
}