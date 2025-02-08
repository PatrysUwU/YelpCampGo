import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import api from "../../services/api.ts";
import Navbar from "../../components/Navbar.tsx";

interface Campground {
    title: string;
    price: number;
    description: string;
    image: string;
    location: string;
    ID: number;
}

export default function CampgroundShowPage() {
    const {id} = useParams()
    const [campground, setCampground] = useState<Campground>({
        ID: 0,
        title: "",
        price: 0,
        description: "",
        location: "",
        image: ""
    });

    useEffect(() => {
        api.get(`/campground/${id}`).then((response) => {
            setCampground(response.data.campground)
        })
    }, [])

    return (
        <>
            <Navbar/>
            <Container sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Typography sx={{mt: 2}} variant={"h2"}>{campground.title}</Typography>
            </Container></>
    )
}