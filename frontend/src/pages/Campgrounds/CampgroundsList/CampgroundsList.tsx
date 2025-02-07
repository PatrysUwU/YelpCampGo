import {useEffect, useState} from "react";
import api from "../../../services/api.ts";
import Box from "@mui/material/Box";
import CampgroundCard from "./CampgroundCard.tsx";

interface Campground {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt: Date | null;
    Title: string;
    Price: number;
    Description: string;
    Location: string;
    Image: string;
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