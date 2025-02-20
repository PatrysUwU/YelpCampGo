import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Campgrounds from "./pages/Campgrounds/Campgrounds.tsx";
import CampgroundShowPage from "./pages/CampgroundShowPage/CampgroundShowPage.tsx";
import CampgroundEdit from "./pages/CampgroundEdit/CampgroundEdit.tsx";
import CampgroundNew from "./pages/CampgroundNew/CampgroundNew.tsx";
import Navbar from "./components/Navbar.tsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#323232",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b3b3b3",
    },
  },
});

export default function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/campgrounds" />} />
            <Route path="/campgrounds" element={<Campgrounds />} />
            <Route path="/campgrounds/:id" element={<CampgroundShowPage />} />
            <Route path="/campgrounds/new" element={<CampgroundNew />} />
            <Route path="/campgrounds/:id/edit" element={<CampgroundEdit />} />
          </Routes>
        </BrowserRouter>
        <CssBaseline />
      </ThemeProvider>
    </>
  );
}
