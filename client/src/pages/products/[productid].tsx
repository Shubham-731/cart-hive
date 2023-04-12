import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import Image from "next/image";
import ImageContainer from "@/components/ImageContainer";

const ProductImage = ({ url, alt }: { url: string; alt: string }) => {
  return (
    <Box
      sx={{
        width: "80px",
        height: "80px",
        position: "relative",
        ":hover": {
          cursor: "pointer",
          opacity: 0.75,
        },
      }}
    >
      <Image
        fill={true}
        src={url}
        alt={alt}
        style={{
          borderRadius: "1rem",
        }}
      />
    </Box>
  );
};

export default function Product() {
  return (
    <Container maxWidth="lg">
      <Paper
        sx={{
          marginTop: 2.5,
          padding: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          position: "relative",
          marginBottom: 2.5,
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ width: "fit-content", position: "relative" }}>
          <ImageContainer sx={{ marginBottom: 2 }}>
            <Image
              src="https://source.unsplash.com/featured/?e-commerce,cart,marketting,product"
              alt="Product image"
              fill={true}
              style={{ borderRadius: "1rem" }}
            />
          </ImageContainer>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <ProductImage
              url="https://source.unsplash.com/featured/?electronics,camera"
              alt="Product"
            />
            <ProductImage
              url="https://source.unsplash.com/featured/?electronics,camera"
              alt="Product"
            />
            <ProductImage
              url="https://source.unsplash.com/featured/?electronics,camera"
              alt="Product"
            />
            <ProductImage
              url="https://source.unsplash.com/featured/?electronics,camera"
              alt="Product"
            />
          </Box>
        </Box>

        <Box
          sx={{
            width: "fit-content",
            display: "flex",
            gap: 2,
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
            color="Highlight"
            component={"p"}
          >
            category / brand name
          </Typography>
          <Typography
            component={"h4"}
            fontSize={24}
            variant="h4"
            sx={{ maxWidth: "500px" }}
          >
            Product name: Lorem ipsum dolor sit amet.
          </Typography>
          <Typography
            component={"p"}
            variant="body1"
            color="GrayText"
            sx={{ maxWidth: "500px" }}
          >
            Product description: Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Eveniet deserunt dicta voluptatum ad mollitia quia
            perspiciatis dolorem unde ipsam incidunt.
          </Typography>
          <Typography
            color="error.main"
            sx={{ fontSize: "20px", fontWeight: "bold" }}
          >
            Price: $99.99
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: "semibold", fontSize: "18px" }}>
              Quantity:
            </Typography>

            <ButtonGroup variant="outlined" aria-label="Select Qty.">
              <Tooltip title="Remove Qty" arrow>
                <Button>
                  <Remove />
                </Button>
              </Tooltip>
              <Button sx={{ fontWeight: "bold" }} color="primary" disabled>
                6
              </Button>
              <Tooltip title="Add Qty" arrow>
                <Button>
                  <Add />
                </Button>
              </Tooltip>
            </ButtonGroup>
          </Box>

          <Button
            color="secondary"
            sx={{
              width: "fit-content",
              fontWeight: "bold",
            }}
            variant="contained"
            startIcon={<ShoppingCart />}
            size="large"
            fullWidth
          >
            Add to cart
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
