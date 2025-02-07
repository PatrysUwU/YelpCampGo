import Box from "@mui/material/Box";
import {JSX} from "react";
import {Grid} from "@mui/material";


interface props {
    Title: string;
    Price: number;
    Description: string;
    Image: string;
}

export default function CampgroundCard({Title, Price, Description, Image}: props): JSX.Element {
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

            <Box component={"img"} sx={{maxHeight: "100%", display: "flex"}} src={Image}/>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box>{Title}</Box>
                </Grid>
                <Grid item xs={6}>
                    <Box>{Price}</Box>
                </Grid>
                <Grid item xs={6}>
                    <Box>{Description}</Box>
                </Grid>

            </Grid>
        </Box>

    )
}