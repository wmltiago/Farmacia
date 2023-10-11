import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContex } from "../shared/contexts";
import { useEffect } from "react";
import { Dashboard, ListagemDePessoas } from "../pages";

export const AppRoutes = () => {
    const { setDrawerOptions } = useDrawerContex();

    useEffect(() => {    //garante que o setDrawerOptions seja executado apenas uma vez.
        setDrawerOptions([
            {
                label: "Página Inicial",
                icon: "home",
                path: "/pagina-inicial"
            },
            {
                label: "Pessoas",
                icon: "people",
                path: "/pessoas"
            },
        ])
    }, []); 

    return (
        <Routes>
            <Route path="/pagina-inicial" element={<Dashboard/>} />

            <Route path="/pessoas" element={<ListagemDePessoas/>} />
            {/* <Route path="/cidades/detalhe/:id" element={<Dashboard/>} /> */}

            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        </Routes>

    );
}

