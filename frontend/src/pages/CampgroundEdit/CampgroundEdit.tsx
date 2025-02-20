import CampgroundForm from "../../components/CampgroundForm.tsx";
import Container from "@mui/material/Container";

export default function CampgroundEdit() {
  return (
    <>
      <Container sx={{ flex: 1 }}>
        <CampgroundForm method={"put"} />
      </Container>
    </>
  );
}
