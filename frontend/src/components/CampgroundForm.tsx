import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router";
import api from "../services/api.ts";
import * as React from "react";

interface FormData {
  title?: string;
  price?: number;
  location?: string;
  description?: string;
}

export default function CampgroundForm({ method }: { method: string }) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    price: 0,
    location: "",
    description: "",
  });
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  let { id } = useParams();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const submitChanges = async () => {
      if (method == "put") {
        try {
          await api.put(`/campgrounds/${id}`, {
            ...formData,
            price: Number(formData.price),
          });
        } catch (e) {
          console.error("Error editing campground", e);
        }
      }
      if (method == "post") {
        try {
          let response = await api.post(`/campgrounds`, {
            ...formData,
            price: Number(formData.price),
          });
          id = response.data.id;
        } catch (e) {
          console.error("Error posting campground", e);
        }
      }
    };
    e.preventDefault();
    await submitChanges();
    navigate(`/campgrounds/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/campgrounds/${id}`);
        setFormData(response.data.campground);
      } catch (e) {
        console.error("Error fetching campgrounds", e);
      }
    };
    if (method == "put") {
      fetchData().then();
    }
  }, []);

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField
          label={"Title"}
          name={"title"}
          value={formData.title || ""}
          onChange={handleChange}
        ></TextField>
        <TextField
          label={"Price"}
          name={"price"}
          value={formData.price || ""}
          onChange={handleChange}
        ></TextField>
        <TextField
          label={"Location"}
          name={"location"}
          value={formData.location || ""}
          onChange={handleChange}
        ></TextField>
        <TextField
          multiline
          label={"Description"}
          name={"description"}
          value={formData.description || ""}
          onChange={handleChange}
        ></TextField>
        <Button type="submit" variant="contained">
          Submit
        </Button>
        <Button
          onClick={() => {
            if (method == "put") {
              navigate(`/campgrounds/${id}`);
            } else {
              navigate(-1);
            }
          }}
          variant="contained"
        >
          Back
        </Button>
      </Box>
    </form>
  );
}
