import { Drawer, useTheme, Avatar, Divider, List, ListItemButton, ListItemIcon, ListItemText, Icon, Collapse, useMediaQuery } from "@mui/material";
import React from "react";
import { Box } from "@mui/system";
import { deepOrange } from '@mui/material/colors';
import { ExpandLess, ExpandMore, Home } from "@mui/icons-material";
import { useDrawerContex } from "../../contexts";



interface IMenuLateralProps {
    children: React.ReactNode
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm')); //controlando e recebendo o breakpoint de tamanho de tela. (menor que 600px)

    const { isDrawerOpen, toggleDrawerOpen } = useDrawerContex();

    const [open, setOpen] = React.useState(true); //utilizado para o menu drop
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
                <Box width={theme.spacing(28)} height='100%' display='flex' flexDirection={'column'}>

                    <Box width='100%' height={theme.spacing(20)} display='flex' alignItems='center' justifyContent='center'>
                        <Avatar
                            sx={{ bgcolor: deepOrange[500], height: theme.spacing(8), width: theme.spacing(8) }}>Tiago</Avatar>
                    </Box>

                    <Divider />

                    <Box flex={1}>
                        <List component="nav">
                            <ListItemButton>
                                <ListItemIcon>
                                    <Icon>home</Icon>
                                </ListItemIcon>
                                <ListItemText primary="Página Inicial" />
                            </ListItemButton>

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
                                            <Icon>starred</Icon>
                                        </ListItemIcon>
                                        <ListItemText primary="Starred" />
                                    </ListItemButton>
                                </List>
                            </Collapse>

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