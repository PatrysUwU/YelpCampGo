import {useEffect, useState} from "react";
import api from "../../../services/api.ts";
import Box from "@mui/material/Box";
import CampgroundCard from "./CampgroundCard.tsx";

interface Campground {
    ID: number;
    title: string;
    price: number;
    description: string;
    location: string;
    image: string;
}


export default function CampgroundsList() {

    const [campgrounds, setCampgrounds] = useState<Campground[]>([]);


    useEffect(() => {
        api.get("/campground").then((response) => {
            setCampgrounds(response.data.campgrounds);
        });
    }, []);

    return (
        <>
            <Box>
                {campgrounds.map(campground => {
                    return <CampgroundCard {...campground} key={campground.ID}/>
                })}
            </Box>

        </>
    )
}