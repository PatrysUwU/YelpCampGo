import Box from "@mui/material/Box";
import {JSX} from "react";
import {Grid} from "@mui/material";
import {useNavigate} from "react-router";


interface props {
    title: string;
    price: number;
    description: string;
    image: string;
    ID:number;
}

export default function CampgroundCard({title, price, description, image,ID}: props): JSX.Element {
    const navigate = useNavigate()
    return (
        <Box sx={{
            height: "200px",
            marginTop: "12px",
            border: "solid 1px",
            borderColor: "secondary.main",
            borderRadius: "10px",
            overflow: "hidden",
            display: "flex",

        }}>

            <Box component={"img"} sx={{maxHeight: "100%", display: "flex"}} src={image}/>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box sx={{cursor:"pointer"}} onClick={()=>{navigate(`./${ID}`)}}>{title}</Box>
                </Grid>
                <Grid item xs={6}>
                    <Box>{price}</Box>
                </Grid>
                <Grid item xs={6}>
                    <Box>{description}</Box>
                </Grid>

            </Grid>
        </Box>

    )
}