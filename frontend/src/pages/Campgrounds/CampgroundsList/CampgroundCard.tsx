import Box from "@mui/material/Box";
import {JSX} from "react";
import {useNavigate} from "react-router";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


interface props {
    title: string;
    price: number;
    description: string;
    image: string;
    ID: number;
}

export default function CampgroundCard({title, price, description, image, ID}: props): JSX.Element {
    const navigate = useNavigate()
    return (
        <Box sx={{
            height: {md: 200, xs: 150},
            marginTop: "12px",
            border: "solid 1px",
            borderColor: "secondary.main",
            borderRadius: "10px",
            overflow: "hidden",
            display: "flex",

        }}>

            <Box component={"img"} sx={{objectFit: "cover", width: {md: "30%", xs: "50%"}, display: "flex"}}
                 src={image}/>
            <Box sx={{display: "flex", flexDirection: "column", width: "70%"}}>
                <Box sx={{ml: 2, height: "50%", display: "flex", alignItems: "center"}}>
                    <Typography sx={{fontWeight: "bold", fontSize: {md: "2rem", xs: "1rem"}}}>{title}</Typography>
                </Box>
                <Box sx={{
                    ml: 2,
                    height: "50%",
                    display: "flex",
                    alignItems: {xs: "flex-start", sm: "center"},
                    flexDirection: {xs: "column", sm: "row"}
                }}>
                    <Typography sx={{
                        width: "50%",
                        display: {md: "block", xs: "none"},
                    }}>{description}</Typography>
                    <Typography sx={{}}>{price}$/night</Typography>
                    <Button onClick={() => {
                        navigate(`./${ID}`)
                    }} sx={{ml: {xs: 0, sm: 3}}} variant={"contained"}>Visit</Button>

                </Box>
            </Box>

        </Box>

    )
}