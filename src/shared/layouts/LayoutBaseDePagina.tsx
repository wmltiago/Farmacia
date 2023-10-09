import { Icon, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useDrawerContex } from "../contexts";
import { ReactNode } from "react";


interface ILayoutBaseDePaginaProps {
    children: React.ReactNode;
    titulo: string;
    barraDeFerramentas?: ReactNode;

}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({ children, titulo, barraDeFerramentas }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));

    const {toggleDrawerOpen} = useDrawerContex();
    

    return (
        <Box height="100%" display="flex" flexDirection="column" gap={1}>
            <Box display="flex" alignItems="center" padding={1} gap={1} height={theme.spacing(smDown ? 6 : mdDown ? 8: 12)} >
                {smDown && (
                <IconButton onClick={toggleDrawerOpen}>
                    <Icon>menu</Icon>
                </IconButton>)}

                <Typography 
                variant={smDown ? "h5" : mdDown ? "h4" : "h3"} //reduz o tamanho da fonte a partir do tamanho da tela
                overflow="hidden" //texto mt grande não quebra linha, ele corta o texto para ficar fora do box
                whiteSpace="nowrap" //para que o texto n quebre linha
                textOverflow="ellipsis" //faz aparecer no final do texto 3 pontinhos
                >
                    {titulo}
                </Typography>
            </Box>

            {barraDeFerramentas && ( 
            <Box>
                {barraDeFerramentas}
            </Box>
            )}
        
            <Box flex={1} overflow="auto"> 
                {children}
            </Box>
        </Box>
    );
}