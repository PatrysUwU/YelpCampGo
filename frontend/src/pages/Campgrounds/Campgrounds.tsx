import CampgroundsList from "./CampgroundsList/CampgroundsList.tsx";
import Container from "@mui/material/Container";
import { useState } from "react";
import Button from "@mui/material/Button";

export default function Campgrounds() {
  const [page, setPage] = useState<number>(0);
  const nextPage = () => {
    setPage((prev) => prev + 1);
    console.log("Next Page:", page + 1);
  };
  const prevPage = () => setPage((prev) => Math.max(0, prev - 1));
  return (
    <>
      <Container>
        <CampgroundsList page={page} />
        <Button variant={"contained"} disabled={page === 0} onClick={prevPage}>
          Previous page
        </Button>
        <Button variant={"contained"} onClick={nextPage}>
          Next page
        </Button>
      </Container>
    </>
  );
}
