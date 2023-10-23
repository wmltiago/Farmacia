import { FerramentasDaListagem, FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";



export const Dashboard = () => {

    return (

        <LayoutBaseDePagina
            titulo="Página Inicial"
            barraDeFerramentas={(
                <FerramentasDeDetalhe mostrarBotaoSalvarEfechar />
                
            )}
        >
            Página Inicial
        </LayoutBaseDePagina>



    );
};