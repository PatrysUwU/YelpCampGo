import { useFormik } from "formik";
import Typography from "@mui/material/Typography";
import { Rating, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import api from "../../../services/api.ts";

export default function RatingForm({ id }: { id: number }) {
  const formik = useFormik({
    initialValues: {
      rating: 2.5,
      review: "",
    },
    onSubmit: async (values) => {
      try {
        await api.post(`/campgrounds/${id}/reviews`, {
          ...values,
        });
      } catch (e) {
        console.error("Error posting a review", e);
      }
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          mt: 2,
          gap: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant={"h5"}>Add a review!</Typography>
        <TextField
          name="review"
          multiline
          placeholder="Add your review!"
          value={formik.values.review}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Typography component="legend">Rating</Typography>
        <Rating
          precision={0.5}
          name="rating"
          value={formik.values.rating}
          onChange={(_, newValue) => {
            formik.setFieldValue("rating", newValue);
          }}
        />
        <Button type={"submit"} variant={"contained"}>
          Add review
        </Button>
      </Box>
    </form>
  );
}
