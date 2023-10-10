import { Box, Button, Divider, Icon, Paper, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material";


interface IFerramentasDeDetalheProps {
    textoBotaoNovo?: string;

    mostrarBotaoNovo?: boolean;
    mostrarBotaoVoltar?: boolean;
    mostrarBotaoApagar?: boolean;
    mostrarBotaoSalvar?: boolean;
    mostrarBotaoSalvarEfechar?: boolean;


    mostrarBotaoNovoCarregando?: boolean;
    mostrarBotaoVoltarCarregando?: boolean;
    mostrarBotaoApagarCarregando?: boolean;
    mostrarBotaoSalvarCarregando?: boolean;
    mostrarBotaoSalvarEfecharCarregando?: boolean;

    aoClicarEmNovo?: () => void;
    aoClicarEmVoltar?: () => void;
    aoClicarEmApagar?: () => void;
    aoClicarEmSalvar?: () => void;
    aoClicarEmSalvarEfechar?: () => void;
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
    textoBotaoNovo = "Novo",

    mostrarBotaoNovo = true, //condicionar a mostrar ou n o botão
    mostrarBotaoVoltar = true,
    mostrarBotaoApagar = true,
    mostrarBotaoSalvar = true,
    mostrarBotaoSalvarEfechar = false,

    mostrarBotaoApagarCarregando = false,
    mostrarBotaoNovoCarregando = false,
    mostrarBotaoSalvarCarregando = false,
    mostrarBotaoSalvarEfecharCarregando = false,
    mostrarBotaoVoltarCarregando = false,

    aoClicarEmNovo,
    aoClicarEmVoltar,
    aoClicarEmApagar,
    aoClicarEmSalvar,
    aoClicarEmSalvarEfechar

}) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));

    return (<Box
        gap={1} //só funciona com display flex e separa os elementos colados (1*8pix)
        height={theme.spacing(5)} //altura do box tomando como medida o useTheme (5*4pix)
        marginX={1}
        padding={1}
        paddingX={2}
        display="flex" //como o layout se comporta na tela, por padrão está como how(linhda) um componete do lado do outro            
        alignItems="center" //centraliza todos os itens
        component={Paper}
    >
        {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) && (
            <Button
                color="primary"
                disableElevation
                variant="contained" //fica destacado, marcado
                onClick={aoClicarEmSalvar}
                startIcon={<Icon>save</Icon>} //posso colocar o icone mudando a propriedade endIcon ou startIcon
            >
                <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                    Salvar
                </Typography>
            </Button>
        )}

        {mostrarBotaoSalvarCarregando && (
            <Skeleton width={110} height={60} />
        )}

        {(mostrarBotaoSalvarEfechar && !mostrarBotaoSalvarEfecharCarregando && !smDown && !mdDown) && (
            <Button
                color="primary"
                disableElevation
                variant="outlined" //fica vazado, transparente
                onClick={aoClicarEmSalvarEfechar}
                startIcon={<Icon>save</Icon>}
            >
                <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                    Salvar e voltar
                </Typography>

            </Button>
        )}

        {(mostrarBotaoSalvarEfecharCarregando && !smDown && !mdDown) && (
            <Skeleton width={180} height={60} />
        )}

        {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) && (
            <Button
                color="primary"
                disableElevation
                variant="outlined"
                onClick={aoClicarEmApagar}
                startIcon={<Icon>delete</Icon>}
            >
                <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                    Apagar
                </Typography>
            </Button>
        )}

        {mostrarBotaoApagarCarregando && (
            <Skeleton width={110} height={60} />
        )}

        {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown && !mdDown) && (
            <Button
                color="primary"
                disableElevation
                variant="outlined"
                onClick={aoClicarEmNovo}
                startIcon={<Icon>add</Icon>}
            >
                <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                    {textoBotaoNovo}
                </Typography>
            </Button>
        )}

        {(mostrarBotaoNovoCarregando && !smDown) && (
            <Skeleton width={110} height={60} />
        )}

        {(mostrarBotaoVoltar &&
        (mostrarBotaoNovo || mostrarBotaoApagar || mostrarBotaoSalvar || mostrarBotaoSalvarEfechar)
        ) && (
            <Divider variant="middle" orientation="vertical" />
        )}

        {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) && (
            <Button
                color="primary"
                disableElevation
                variant="outlined"
                onClick={aoClicarEmVoltar}
                startIcon={<Icon>arrow_back</Icon>}
            >
                <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                    Voltar
                </Typography>
            </Button>
        )}

        {mostrarBotaoVoltarCarregando && (
            <Skeleton width={110} height={60} />
        )}

    </Box>
    );
}