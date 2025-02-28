import Box from "@mui/material/Box";
import { JSX } from "react";
import { useNavigate } from "react-router";
import Typography from "@mui/material/Typography";

interface props {
  title: string;
  price: number;
  description: string;
  image: string;
  ID: number;
}

export default function CampgroundCard({
  title,
  price,
  description,
  image,
  ID,
}: props): JSX.Element {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: { md: 200, xs: 150 },
        marginY: "12px",
        border: "solid 1px",
        borderColor: "secondary.main",
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
      }}
    >
      <Box
        onClick={() => {
          navigate(`./${ID}`);
        }}
        component={"img"}
        sx={{
          objectFit: "cover",
          width: { md: "30%", xs: "50%" },
          display: "flex",
          ":hover": { cursor: "pointer" },
        }}
        src={image || "https://placehold.co/600"}
      />
      <Box sx={{ display: "flex", flexDirection: "column", width: "70%" }}>
        <Box
          sx={{ ml: 2, height: "50%", display: "flex", alignItems: "center" }}
        >
          <Typography
            onClick={() => {
              navigate(`./${ID}`);
            }}
            sx={{
              fontWeight: "bold",
              fontSize: { md: "2rem", xs: "1rem" },
              ":hover": { cursor: "pointer" },
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box
          sx={{
            ml: 2,
            height: "50%",
            display: "flex",

            alignItems: { xs: "flex-start", sm: "center" },
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Typography
            sx={{
              width: "50%",
              display: { md: "block", xs: "none" },
            }}
          >
            {description}
          </Typography>
          <Typography sx={{}}>{price}$/night</Typography>
        </Box>
      </Box>
    </Box>
  );
}
