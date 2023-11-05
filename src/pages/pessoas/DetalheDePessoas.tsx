import { useNavigate, useParams } from "react-router-dom";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { Save } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { Box, Container, Grid, LinearProgress, Paper, TextField, Typography } from "@mui/material";
import { VTextField, VForm, useVForm } from "../../shared/forms";



interface IFormData { //tipagem exclusiva para o unform
    email: string;
    cidadeId: number;
    nomeCompleto: string;
}

export const DetalheDePessoas: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navegate = useNavigate();
    const { formRef, save, saveAndClose, IsSaveAndClose } = useVForm(); //pega referencias de outros elementos

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState("");

    useEffect(() => {
        if (id !== "nova") {
            setIsLoading(true);

            PessoasService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                        navegate("/pessoas");
                    } else {
                        setNome(result.nomeCompleto);

                        formRef.current?.setData(result); // para preencher os dados cadastrados para as inputs.
                    }
                });
        } else {
            formRef.current?.setData({
                nomeCompleto: "",
                email: "",
                cidadeId: "",
            });
        }
    }, [id]);

    const handleSave = (dados: IFormData) => {
        setIsLoading(true);

        if (id === "nova") {
            PessoasService.create(dados)
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        if (IsSaveAndClose()) {
                            navegate('/pessoas');

                        } else {
                            // navegate(`/pessoas/detalhe/${result}`)
                            navegate('/pessoas/detalhe/nova');
                        }

                    }
                });

        } else {
            PessoasService
                .upDateById(Number(id), { id: Number(id), ...dados })
                .then((result) => {
                    setIsLoading(false);
                    alert("Resgistro salvo com sucesso!");
                    if (result instanceof Error) {
                        alert(result.message);
                    }else{
                        if (IsSaveAndClose()) {
                            navegate('/pessoas');

                        }
                    }
                });

        }
    };


    const handleDelete = (id: number) => {
        if (confirm("Realmente deseja excluir este usuário?")) {
            PessoasService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        alert("Resgistro apagado com sucesso!");
                        navegate("/pessoas");
                    }
                });
        }

    }


    return (
        <LayoutBaseDePagina
            titulo={id === "nova" ? "Nova pessoa" : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    textoBotaoNovo="Nova"
                    mostrarBotaoSalvarEfechar
                    mostrarBotaoApagar={id !== "nova"} //só mostra o botão de apagar se for clicado em editar
                    mostrarBotaoNovo={id !== "nova"}

                    aoClicarEmSalvar={save}
                    aoClicarEmSalvarEfechar={saveAndClose}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmNovo={() => navegate("/pessoas/detalhe/nova")}
                    aoClicarEmVoltar={() => navegate("/pessoas")}
                />
            }
        >


            {/* {isLoading &&(
                <LinearProgress variant="indeterminate"/>
            )} */}

            <VForm ref={formRef} onSubmit={handleSave}>

                <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined" height="100%" >

                    <Grid container direction="column" padding={2} spacing={2} alignItems="center" display="flex" justifyContent="center" >

                        {isLoading && (
                            <Grid item>
                                <LinearProgress variant="indeterminate" />
                            </Grid>
                        )}

                        <Grid item>
                            <Typography variant="h6">Geral</Typography>
                        </Grid>

                        <Grid container item direction="row" spacing={2} alignItems="center" display="flex" justifyContent="center">
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    fullWidth
                                    label="Nome Completo"
                                    name="nomeCompleto"
                                    disabled={isLoading}
                                    onChange={e => setNome(e.target.value)}
                                />

                            </Grid>
                            {/* <Grid item xs={6} sm={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    placeholder="Nome Completo"
                                    name="nomeCompleto"
                                    fullWidth />
                            </Grid>                             */}
                        </Grid>

                        <Grid container item direction="row" spacing={2} alignItems="center" display="flex" justifyContent="center">
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2} >
                                <VTextField
                                    fullWidth
                                    label="E-mail"
                                    name="email"
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>

                        <Grid container item direction="row" spacing={2} alignItems="center" display="flex" justifyContent="center">
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    fullWidth
                                    label="Cidade"
                                    name="cidadeId"
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>

                    </Grid>


                </Box>

            </VForm >

        </LayoutBaseDePagina>

    );
};
