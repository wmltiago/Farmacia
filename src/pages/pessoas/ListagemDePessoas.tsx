import { useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useEffect, useMemo, useState } from "react";
import { IListagemPessoa, PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { useDebounce } from "../../shared/hooks";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


export const ListagemDePessoas: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce(3000);

    const [rows, setRows] = useState<IListagemPessoa[]>([]);
    const [totalCount, setTotalCount] = useState(0); //guardar qntdade total de registros do BD
    const [isLoading, setIsLoading] = useState(true); //feedback visual de carregamento dops dados

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);


    useEffect(() => {
        setIsLoading(true); //garantir que ele busque os dados do back

        debounce(() => {
            PessoasService.getAll(1, busca)
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        console.log(result);

                        setRows(result.data);
                        setTotalCount(result.totalCount);
                    }
                });
        });



    }, [busca]);


    return (
        <LayoutBaseDePagina
            titulo="Listagem de pessoas"
            barraDeFerramentas={
                <FerramentasDaListagem
                    textoBotaoNovo="Nova"
                    mostrarInputBusca
                    textoDaBusca={busca}
                    aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
                />
            }
        >
            <TableContainer component={Paper} variant="outlined" sx={{margin: 1, width:"auto"}}> 
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Ações</TableCell>
                            <TableCell align="center">Nome completo</TableCell>
                            <TableCell align="center">E-mail</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row =>(
                            <TableRow key={row.id}>
                            <TableCell align="center">Ações</TableCell>
                            <TableCell align="center">{row.nomeCompleto}</TableCell>
                            <TableCell align="center">{row.email}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </LayoutBaseDePagina>
    );
}