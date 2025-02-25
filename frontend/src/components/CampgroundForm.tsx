import { useFormik } from "formik";
import * as yup from "yup";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import api from "../services/api.ts";
import { useNavigate, useParams } from "react-router";
import Box from "@mui/material/Box";

const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  price: yup
    .number()
    .typeError("Must be a number")
    .positive("Price can't be lower than zero")
    .test(
      "decimal-places",
      "Maximum 2 decimal places allowed",
      (value) =>
        value === undefined || /^\d+(\.\d{1,2})?$/.test(value.toString()),
    )
    .required("Price is required"),
  location: yup.string().required("Location is required"),
  description: yup.string().optional(),
});

interface FormData {
  title?: string;
  price?: number;
  location?: string;
  description?: string;
}

export default function CampgroundForm({ method }: { method: string }) {
  const formik = useFormik<FormData>({
    initialValues: {
      title: "",
      price: 0.0,
      location: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: FormData) => {
      if (method == "put") {
        try {
          await api.put(`/campgrounds/${id}`, {
            ...values,
            price: Number(values.price),
            description: values.description || "No description provided",
          });
        } catch (e) {
          console.error("Error editing campground", e);
        }
      }
      if (method == "post") {
        try {
          let response = await api.post(`/campgrounds`, {
            ...values,
            price: Number(values.price),
            description: values.description || "No description provided",
          });
          id = response.data.id;
        } catch (e) {
          console.error("Error posting campground", e);
        }
      }
      navigate(`/campgrounds/${id}`);
    },
  });

  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/campgrounds/${id}`);
        await formik.setValues(response.data.campground, true);
      } catch (e) {
        console.error("Error fetching campgrounds", e);
      }
    };

    if (method == "put") {
      fetchData().then();
    }
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField
          name="title"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          name="price"
          label="Price"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
        />
        <TextField
          name="location"
          label="Location"
          value={formik.values.location}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.location && Boolean(formik.errors.location)}
          helperText={formik.touched.location && formik.errors.location}
        />
        <TextField
          multiline
          name="description"
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />

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
