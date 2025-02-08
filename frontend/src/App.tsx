import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import Campgrounds from "./pages/Campgrounds/Campgrounds.tsx";
import {dark} from "@mui/material/styles/createPalette";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#323232',
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b3b3b3',
        },
    },
});

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2', // Jasny niebieski (odpowiednik #90caf9 z dark theme)
        },
        secondary: {
            main: '#f5f5f5', // Jasny szary (odpowiednik #323232 z dark theme)
        },
        background: {
            default: '#ffffff', // Białe tło
            paper: '#f5f5f5',   // Lekko szare tło dla komponentów
        },
        text: {
            primary: '#000000', // Czarny tekst
            secondary: '#616161', // Szary tekst
        },
    },
});

export default function App() {

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="/campgrounds"/>}/>
                        <Route path="/campgrounds" element={<Campgrounds/>}/>
                    </Routes>
                </BrowserRouter>
                <CssBaseline/>
            </ThemeProvider>
        </>
    )
}


