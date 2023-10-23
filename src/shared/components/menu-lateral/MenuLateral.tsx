import { Drawer, useTheme, Avatar, Divider, List, ListItemButton, ListItemIcon, ListItemText, Icon, Collapse, useMediaQuery } from "@mui/material";
import React from "react";
import { Box } from "@mui/system";
import { cyan, deepOrange } from '@mui/material/colors';
import { ExpandLess, ExpandMore, Home } from "@mui/icons-material";
import { useAppThemeContex, useDrawerContex } from "../../contexts";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";


interface IMenuLateralProps {
    children: React.ReactNode
}

interface IListItemProps {
    label: string; //nome do item
    icon: string; //icone
    to: string; //rota para onde navegar
    onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemProps> = ({ to, icon, label, onClick }) => {
    const navigate = useNavigate();

    const resolverPath = useResolvedPath(to); //hook do React router dom para resolver qual patch estamos atualmente.
    const match = useMatch({ path: resolverPath.pathname, end: false, });//hook do React router dom para identificar se a rota está selecionada ou não.
    const handleClick2 = () => {
        navigate(to);
        onClick?.(); //verifica se uma função é undefined
    };

    return (
        <ListItemButton selected={!!match} onClick={handleClick2}>
            <ListItemIcon>
                <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    );
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm')); //controlando e recebendo o breakpoint de tamanho de tela. (menor que 600px)

    const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContex();
    const { toggleTheme } = useAppThemeContex();

    const [open, setOpen] = React.useState(false); //utilizado para o menu drop iniciar aberto ou fechado
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
                <Box width={theme.spacing(28)} height='100%' display='flex' flexDirection={'column'}>

                    <Box width='100%' height={theme.spacing(20)} display='flex' alignItems='center' justifyContent='center'>
                        <Avatar
                            sx={{ bgcolor: cyan[500], height: theme.spacing(8), width: theme.spacing(8) }}>Tiago</Avatar>
                    </Box>

                    <Divider />

                    <Box flex={1}>
                        <List component="nav">
                            {drawerOptions.map(drawerOption => (
                                <ListItemLink
                                    key={drawerOption.path}
                                    icon={drawerOption.icon}
                                    to={drawerOption.path}
                                    label={drawerOption.label}
                                    onClick={smDown ? toggleDrawerOpen : undefined}
                                />
                            ))}
                            <ListItemButton onClick={handleClick}>
                                <ListItemIcon>
                                    <Icon>inbox</Icon>
                                </ListItemIcon>
                                <ListItemText primary="Inbox" />
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <Icon>highlight</Icon>
                                        </ListItemIcon>
                                        <ListItemText primary="Starred" />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                        </List>
                    </Box>
                    <Box>
                        <List component="nav">
                            <ListItemButton onClick={toggleTheme}>
                                <ListItemIcon>
                                    <Icon>dark_mode</Icon>
                                </ListItemIcon>
                                <ListItemText primary="Alterar Tema" />
                            </ListItemButton>
                        </List>
                    </Box>
                </Box>
            </Drawer>

            <Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(28)}>
                {children}
            </Box>
        </>
    );
}