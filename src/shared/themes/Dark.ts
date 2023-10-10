import {createTheme} from '@mui/material'
//import {createTheme} from '@mui/material/styles'
import { cyan } from '@mui/material/colors';
import { yellow } from '@mui/material/colors';
import { dark } from '@mui/material/styles/createPalette';


export const DarkTheme = createTheme({
        palette: {
            mode: 'dark', //o tema altera a cor dos botões pra contraste
        primary: {
            main: yellow[700],
            dark: yellow[800],
            light: yellow[500],
            contrastText: '#ffffff',
        },
        secondary:{
            main: cyan[500],
            dark: cyan[400],
            light: cyan[300],
            contrastText: '#ffffff',
        },
        background:{
            default: '#202124',
            paper: '#303134',
        }
    },
    typography:{
        allVariants: {
            color: 'white',
        }
    }
});