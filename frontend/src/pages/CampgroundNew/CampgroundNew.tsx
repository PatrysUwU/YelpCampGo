import CampgroundForm from "../../components/CampgroundForm.tsx";
import Container from "@mui/material/Container";

export default function CampgroundNew() {
  return (
    <>
      <Container>
        <CampgroundForm method={"post"} />
      </Container>
    </>
  );
}
