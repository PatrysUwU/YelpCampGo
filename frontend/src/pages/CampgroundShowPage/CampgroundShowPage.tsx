import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import api from "../../services/api.ts";
import Box from "@mui/material/Box";
import { ButtonGroup, capitalize, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import RatingForm from "./RatingForm/RatingForm.tsx";

interface Campground {
  title: string;
  price: number;
  description: string;
  image: string;
  location: string;
  ID: number;
}

let infoArray: (keyof Campground)[] = ["price", "location", "description"];

export default function CampgroundShowPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [campground, setCampground] = useState<Campground>({
    ID: 0,
    title: "",
    price: 0,
    description: "",
    location: "",
    image: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/campgrounds/${id}`);
        setCampground(response.data.campground);
      } catch (e) {
        console.error("Error fetching campgrounds", e);
      } finally {
      }
    };
    fetchData().then();
  }, []);

  const handleDelete = () => {
    api.delete(`/campgrounds/${id}`).then((response) => {
      if (response.status == 200) {
        navigate(`/`);
      } else {
        //TODO error page
      }
    });
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            my: 3,
            fontSize: { xs: "2rem", md: "4rem" },
          }}
          variant={"h2"}
        >
          {campground.title}
        </Typography>
        <Box
          sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
        >
          <Paper
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              justifyContent: "space-evenly",
              mr: 3,
              px: 3,
            }}
          >
            {infoArray.map((e, i) => {
              return (
                <Typography key={i} sx={{ my: 0.5 }}>
                  {capitalize(e)}: {campground[e]}
                </Typography>
              );
            })}
          </Paper>
          <Box
            component={"img"}
            src={campground.image || "https://placehold.co/600x400"}
            sx={{
              width: "100%",
              aspectRatio: { xs: "16/9", md: "6/4" },
              objectFit: "cover",
              mr: { xs: 0, sm: 2 },
            }}
          />
          <Paper
            sx={{
              display: { xs: "flex", md: "none" },
              flexDirection: "column",
              justifyContent: "space-evenly",
              py: 1,
              px: 3,
            }}
          >
            {infoArray.map((e, i) => {
              return (
                <Typography key={i} sx={{ my: 0.5 }}>
                  {capitalize(e) + ": "}
                  {e == "price" ? "$" : ""}
                  {campground[e]}
                  {e == "price" ? "/night" : ""}
                </Typography>
              );
            })}
          </Paper>

          <RatingForm id={campground.ID} />
        </Box>
        <ButtonGroup variant="contained" sx={{ mt: 3 }}>
          <Button onClick={() => navigate("/")}>Home</Button>
          <Button onClick={() => navigate("./edit")}>Edit</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </ButtonGroup>
      </Container>
    </>
  );
}
