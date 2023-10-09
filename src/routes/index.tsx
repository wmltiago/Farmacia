import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContex } from "../shared/contexts";
import { useEffect } from "react";
import { Dashboard } from "../pages";

export const AppRoutes = () => {
    const { setDrawerOptions } = useDrawerContex();

    useEffect(() => {    //garante que o setDrawerOptions seja executado apenas uma vez.
        setDrawerOptions([
            {
                label: "Página Inicial",
                icon: "home",
                path: "pagina-inicial"
            },
            {
                label: "Pág Secundaria",
                icon: "star",
                path: "pagina-inicial"
            },
        ])
    }, []); 

    return (
        <Routes>
            <Route path="/pagina-inicial" element={<Dashboard/>} />

            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        </Routes>

    );
}

