import { Button } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppThemeContex } from "../shared/contexts";

export const AppRoutes = () => {
    const {toggleTheme} = useAppThemeContex(); 

    return(
        <Routes>
            <Route path="/pagina-inicial" element ={<Button variant="contained" color="primary" onClick={toggleTheme}>Troca tema</Button>}/>    

            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        </Routes>

    );
}

