import React, { createContext, useCallback, useContext, useState } from "react";


interface IDrawerContextData {
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;

}


const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContex = () => { //hook customizado 
    return useContext(DrawerContext);
}

interface IDrawerProviderProps {
    children: React.ReactNode
}


export const DrawerProvider: React.FC<IDrawerProviderProps> = ({ children }) => {
    const [isDrawerOpen, SetIsDrawerOpen] = useState(false); //definindo tema padrão com parametro de tipagem

    const toggleDrawerOpen = useCallback(() => { //callback (função que armazena funções) com array de dependencias
        SetIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
    }, []);


    return (
        <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen }}>
            {children}
        </DrawerContext.Provider>
    );
}