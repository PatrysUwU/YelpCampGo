import Container from "@mui/material/Container";
import CampgroundForm from "../../components/CampgroundForm.tsx";
import Typography from "@mui/material/Typography";

export default function CampgroundNew() {
  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <Typography variant={"h2"}>Creating new campground</Typography>
        <CampgroundForm method={"post"} />
      </Container>
    </>
  );
}
