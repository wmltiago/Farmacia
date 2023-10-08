import { Button } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContex } from "../shared/contexts";

export const AppRoutes = () => {
    const { toggleDrawerOpen } = useDrawerContex(); 

    return(
        <Routes>
            <Route path="/pagina-inicial" element ={<Button variant="contained" color="primary" onClick={toggleDrawerOpen}>Menu</Button>}/>    

            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        </Routes>

    );
}

