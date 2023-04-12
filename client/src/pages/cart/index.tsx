import { ShoppingCartCheckout } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";

const CartProduct = () => {
  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      <Box sx={{ position: "relative", width: "100px", height: "100px" }}>
        <Image
          src="https://source.unsplash.com/featured/?e-commerce,cart,marketting,product"
          alt="product image"
          fill={true}
        />
      </Box>

      <Box>
        <Typography
          variant="h6"
          sx={{ width: "100%", marginBottom: 1 }}
          maxWidth="20rem"
          noWrap
        >
          Product name: Lorem ipsum dolor sit amet.
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <Typography color="GrayText">Quantity: 3</Typography>
          <Typography variant="body1" component="p">
            Total Price:{" "}
            <Typography component="span" color="error.main">
              $99.00
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const Cart = () => {
  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          marginTop: 2.5,
          padding: 2,
          position: "relative",
          marginBottom: 2.5,
          paddingBottom: 1,
        }}
      >
        <Stack
          direction="column"
          divider={<Divider />}
          spacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ maxHeight: "64vh", overflowY: "auto" }}
        >
          <CartProduct />
          <CartProduct />
          <CartProduct />
          <CartProduct />
          <CartProduct />
          <CartProduct />
        </Stack>

        <Box
          my={2}
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" component="p">
            Total Price:{" "}
            <Typography
              component="span"
              color="error.main"
              sx={{ fontSize: "18px", fontWeight: "bold" }}
            >
              $499.00
            </Typography>
          </Typography>

          <Button
            color="secondary"
            variant="contained"
            size="medium"
            startIcon={<ShoppingCartCheckout />}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Cart;
