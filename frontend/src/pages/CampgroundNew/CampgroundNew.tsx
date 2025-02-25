import Container from "@mui/material/Container";
import CampgroundForm from "../../components/CampgroundForm.tsx";

export default function CampgroundNew() {
  return (
    <>
      <Container>
        <CampgroundForm method={"post"} />
      </Container>
    </>
  );
}
