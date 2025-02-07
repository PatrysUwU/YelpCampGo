import Navbar from "../../components/Navbar.tsx";
import CampgroundsList from "./CampgroundsList/CampgroundsList.tsx";
import Container from "@mui/material/Container";

export default function Campgrounds() {


    return (
        <>
            <Navbar/>
            <Container>
                <CampgroundsList/>
            </Container>
        </>
    )
}