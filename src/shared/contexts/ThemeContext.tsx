//criando um contexto para compartihar as info do tema
import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Box, ThemeProvider } from "@mui/material";
import { LightTheme, DarkTheme } from "./../themes";

interface IThemeContextData {
    themeName: 'ligth' | 'dark'  //tipagem desta propriedade
    toggleTheme: () => void; //alterna os temas (slaro, escuro e os que tiver)
}


const ThemeContext = createContext({} as IThemeContextData); //esse contexto vai ter as mesmas propriedades definidas na interface acima

export const useAppThemeContex = () =>{ //hook customizado para pegar o tema em qualquer lugar
    return useContext(ThemeContext);
}

interface IAppThemeProviderProps{
    children: React.ReactNode
}

export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({ children }) => {
    const [themeName, SetThemeName] = useState<'ligth' | 'dark'>('ligth'); //definindo tema padrão com parametro de tipagem (<'ligth' | 'dark'>)

    const toggleTheme = useCallback(() => { //callback (função que armazena funções) com array de dependencias
        SetThemeName(oldThemeName => oldThemeName === 'ligth' ? 'dark' : 'ligth'); //oldThemename tem o valor de ligh e dark
    }, []);

    const theme = useMemo(() => { //retorna o tema atual
       if(themeName === 'ligth') return LightTheme;
       
       return DarkTheme;
    }, [themeName]);

    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
                {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}