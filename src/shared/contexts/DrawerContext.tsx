import React, { createContext, useCallback, useContext, useState } from "react";


interface IDrawerOption{
    icon: string;
    label: string;
    path: string;
}

interface IDrawerContextData {
    isDrawerOpen: boolean;    
    toggleDrawerOpen: () => void;
    drawerOptions: IDrawerOption[];
    setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
}


const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContex = () => { //hook customizado 
    return useContext(DrawerContext);
}

interface IDrawerProviderProps {
    children: React.ReactNode
}


export const DrawerProvider: React.FC<IDrawerProviderProps> = ({ children }) => {    
    const [drawerOptions, SetDrawerOptions] = useState<IDrawerOption[]>([]);
    const [isDrawerOpen, SetIsDrawerOpen] = useState(false); //definindo tema padrão com parametro de tipagem

    const toggleDrawerOpen = useCallback(() => { //callback (função que armazena funções) com array de dependencias
        SetIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
    }, []);

    const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => { //recebe por parametro novas opções de menu
        SetDrawerOptions(newDrawerOptions);
    }, []);

    return (
        <DrawerContext.Provider value={{ isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handleSetDrawerOptions }}>
            {children}
        </DrawerContext.Provider>
    );
}