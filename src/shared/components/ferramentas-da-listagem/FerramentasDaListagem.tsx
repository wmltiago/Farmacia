import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";


interface IFerramentasDaListagemProps {
    textoDaBusca?: string;
    mostrarInputBusca?: boolean;
    aoMudarTextoDeBusca?: (novoTexto: string) => void;
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    aoClicarEmNovo?: () => void;

}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
    textoDaBusca = '',
    aoMudarTextoDeBusca,
    mostrarInputBusca = false,
    aoClicarEmNovo,
    textoBotaoNovo = "Novo",
    mostrarBotaoNovo = true

}) => {
    const theme = useTheme();

    return (
        <Box
            gap={1} //só funciona com display flex e separa os elementos colados (1*8pix)
            height={theme.spacing(5)} //altura do box tomando como medida o useTheme (5*4pix)
            marginX={1}
            padding={1}
            paddingX={2}
            display="flex" //como o layout se comporta na tela, por padrão está como how(linhda) um componete do lado do outro            
            alignItems="center" //centraliza todos os itens
            component={Paper}
        >
            {mostrarInputBusca && ( //so mostrar o textfild se for true
                <TextField
                    size="small" //tamanho do input
                    value={textoDaBusca}
                    onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)} //configuração do input de pesquisa
                    placeholder="Pesquisar..."
                />
            )}

            <Box flex={1} display="flex" justifyContent="end">
                {mostrarBotaoNovo && (
                    <Button
                        color="primary"
                        disableElevation
                        variant="contained"
                        onClick={aoClicarEmNovo}
                        endIcon={<Icon>add</Icon>}
                    >{textoBotaoNovo}</Button>
                )}
            </Box>
        </Box>
    );
}