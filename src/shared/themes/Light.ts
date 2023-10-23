import {createTheme} from '@mui/material'
//import {createTheme} from '@mui/material/styles'
import { cyan } from '@mui/material/colors';
import { yellow } from '@mui/material/colors';


export const LightTheme = createTheme({
    palette: {
        primary: {
            main: cyan[700],
            dark: cyan[800],
            light: cyan[500],
            // main: yellow[700],
            // dark: yellow[800],
            // light: yellow[500],
            contrastText: '#ffffff',
        },
        secondary:{
            main: cyan[500],
            dark: cyan[400],
            light: cyan[300],
            contrastText: '#ffffff',
        },
        background:{
            default: '#f7f6f3',
            paper: '#ffffff',
        }
    }
});