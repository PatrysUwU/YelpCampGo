import Container from "@mui/material/Container";
import CampgroundForm from "../../components/CampgroundForm.tsx";

export default function CampgroundEdit() {
  return (
    <>
      <Container sx={{ flex: 1 }}>
        <CampgroundForm method={"put"} />
      </Container>
    </>
  );
}
