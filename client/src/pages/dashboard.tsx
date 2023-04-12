import ProductSection from "@/components/Product/Section";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Image as ImageIcon } from "@mui/icons-material";
import { useFormik } from "formik";

interface ProductValues {
  productName: string;
  productPrice: string;
  productDesc: string;
  brandName: string;
  category: string;
}

const dashboard = () => {
  const initialValues: ProductValues = {
    productName: "",
    productDesc: "",
    productPrice: "",
    brandName: "",
    category: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, action) => {
      console.log(values);
    },
  });

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h5"
        component="h1"
        textAlign="center"
        my={3}
        fontWeight="bold"
      >
        Add new Product
      </Typography>

      <Container maxWidth="md" sx={{ marginBottom: 3 }}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Box
            component={"form"}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
            onSubmit={formik.handleSubmit}
          >
            <TextField
              label="Product name"
              variant="outlined"
              sx={{ maxWidth: "49%" }}
              name="productName"
              value={formik.values.productName}
              onChange={formik.handleChange}
              required
              fullWidth
            />
            <TextField
              label="Product price"
              variant="outlined"
              sx={{ maxWidth: "49%" }}
              name="productPrice"
              value={formik.values.productPrice}
              onChange={formik.handleChange}
              required
              fullWidth
            />
            <TextField
              label="Product description"
              variant="outlined"
              name="productDesc"
              value={formik.values.productDesc}
              onChange={formik.handleChange}
              required
              fullWidth
            />
            <TextField
              label="Brand name"
              variant="outlined"
              sx={{ maxWidth: "49%" }}
              name="brandName"
              value={formik.values.brandName}
              onChange={formik.handleChange}
              required
              fullWidth
            />
            <TextField
              label="Category"
              variant="outlined"
              sx={{ maxWidth: "49%" }}
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              required
              fullWidth
            />
            <FormControl fullWidth sx={{ maxWidth: "49%" }}>
              <InputLabel htmlFor="productImage1">
                Product banner image 1
              </InputLabel>
              <OutlinedInput
                id="productImage1"
                name="productImage1"
                type="file"
                label="Upload product image 1"
                startAdornment={
                  <InputAdornment position="start">
                    <ImageIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ maxWidth: "49%" }}>
              <InputLabel htmlFor="productImage2">
                Product banner image 2
              </InputLabel>
              <OutlinedInput
                id="productImage2"
                name="productImage2"
                type="file"
                label="Upload product image 2"
                startAdornment={
                  <InputAdornment position="start">
                    <ImageIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ maxWidth: "49%" }}>
              <InputLabel htmlFor="productImage3">
                Product banner image 3
              </InputLabel>
              <OutlinedInput
                id="productImage3"
                name="productImage3"
                type="file"
                label="Upload product image 3"
                startAdornment={
                  <InputAdornment position="start">
                    <ImageIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ maxWidth: "49%" }}>
              <InputLabel htmlFor="productImage4">
                Product banner image 4
              </InputLabel>
              <OutlinedInput
                id="productImage4"
                name="productImage4"
                type="file"
                label="Upload product image 4"
                startAdornment={
                  <InputAdornment position="start">
                    <ImageIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              size="medium"
              color="primary"
              variant="contained"
              type="submit"
              sx={{
                display: "block",
                marginLeft: "auto",
                width: "fit-content",
              }}
            >
              Add Product
            </Button>
          </Box>
        </Paper>
      </Container>
      <Divider />
      <ProductSection title="Products for Sale" />
    </Container>
  );
};

export default dashboard;
