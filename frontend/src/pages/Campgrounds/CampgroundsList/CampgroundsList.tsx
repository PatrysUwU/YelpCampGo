import { useEffect, useState } from "react";
import api from "../../../services/api.ts";
import Box from "@mui/material/Box";
import CampgroundCard from "./CampgroundCard.tsx";
import { Skeleton } from "@mui/material";

interface Campground {
  ID: number;
  title: string;
  price: number;
  description: string;
  location: string;
  image: string;
}

export default function CampgroundsList() {
  const [campgrounds, setCampgrounds] = useState<Campground[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await api.get("/campgrounds");
        setCampgrounds(response.data.campgrounds);
      } catch (e) {
        console.error("Error fetching campgrounds", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData().then();
  }, []);

  return (
    <>
      <Box>
        {loading
          ? [...Array(6)].map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={"100%"}
                height={200}
                animation="wave"
              />
            ))
          : campgrounds.map((campground) => (
              <CampgroundCard {...campground} key={campground.ID} />
            ))}
      </Box>
    </>
  );
}
