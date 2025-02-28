import Container from "@mui/material/Container";
import CampgroundForm from "../../components/CampgroundForm.tsx";
import Typography from "@mui/material/Typography";

export default function CampgroundEdit({ title }: { title: string }) {
  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <Typography variant={"h2"}>Editing {title} campground</Typography>
        <CampgroundForm method={"put"} />
      </Container>
    </>
  );
}
