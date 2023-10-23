import { useNavigate, useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useEffect, useMemo, useState } from "react";
import { IListagemPessoa, PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { useDebounce } from "../../shared/hooks";
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { Environment } from "../../shared/environment";


export const ListagemDePessoas: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce(3000);

    const navigate = useNavigate();

    const [rows, setRows] = useState<IListagemPessoa[]>([]);
    const [totalCount, setTotalCount] = useState(0); //guardar qntdade total de registros do BD
    const [isLoading, setIsLoading] = useState(true); //feedback visual de carregamento dos dados

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || "1");
    }, [searchParams]);


    useEffect(() => {
        setIsLoading(true); //garantir que ele busque os dados do back

        debounce(() => {
            PessoasService.getAll(pagina, busca)
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



    }, [busca, pagina]);

    const handleDelete = (id: number) =>{
        if(confirm("Realmente deseja excluir este usuário?")){
            PessoasService.deleteById(id)
            .then(result =>{
                if(result instanceof Error){
                    alert(result.message);
                }else{
                    setRows(oldRows => [
                            ...oldRows.filter(oldRow => oldRow.id !== id),
                        ]);
                    alert("Resgistro apagado com sucesso!");
                }
            });
        }

    }


    return (
        <LayoutBaseDePagina
            titulo="Listagem de pessoas"
            barraDeFerramentas={
                <FerramentasDaListagem
                    textoBotaoNovo="Nova"
                    mostrarInputBusca
                    textoDaBusca={busca}
                    aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
                    aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: "1" }, { replace: true })}
                />
            }
        >
            <TableContainer component={Paper} variant="outlined" sx={{ margin: 1, width: "auto" }}>
                <Table>
                    <TableHead>
                        <TableRow>                            
                            <TableCell align="center">Nome completo</TableCell>
                            <TableCell align="center">E-mail</TableCell>
                            <TableCell align="center">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>                                
                                <TableCell align="center">{row.nomeCompleto}</TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">
                                    <IconButton size="small" onClick={() => handleDelete(row.id)}>
                                        <Icon>delete</Icon>
                                    </IconButton>
                                    <IconButton size="small" onClick={() => navigate(`/pessoas/detalhe/${row.id}`)}>
                                        <Icon>edit</Icon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    {totalCount === 0 && !isLoading && ( //exibe mensagem de sem registros
                        <caption><b>{Environment.LISTAGEM_VAZIA}</b></caption>
                    )}


                    <TableFooter>
                        {isLoading && (
                            <TableRow >
                                <TableCell colSpan={3}>
                                    <LinearProgress variant="indeterminate" />
                                </TableCell>
                            </TableRow>
                        )}
                        {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
                            <TableRow >
                                <TableCell colSpan={3}>
                                    <Pagination
                                        page={pagina}
                                        count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                                        onChange={(e, newPage) => setSearchParams({ busca, pagina: newPage.toString() }, { replace: true })}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableFooter>
                </Table>
            </TableContainer>
        </LayoutBaseDePagina>
    );
}