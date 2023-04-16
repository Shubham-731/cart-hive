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
import { useCart } from "@/contexts/cartContext";
import Link from "next/link";
import { useEffect, useState } from "react";

const CartProduct = ({ title, id, image, quantity, price }: Cart) => {
  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      <Box sx={{ position: "relative", width: "100px", height: "100px" }}>
        <Image src={image} alt={title} fill={true} />
      </Box>

      <Box>
        <Typography
          variant="h6"
          sx={{ width: "100%", marginBottom: 1 }}
          maxWidth="20rem"
          noWrap
        >
          {title}
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
          <Typography color="GrayText">Quantity: {quantity}</Typography>
          <Typography variant="body1" component="p">
            Total Price:{" "}
            <Typography component="span" color="error.main">
              ${quantity * price}
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);

  const { cart } = useCart();

  useEffect(() => {
    const totalPriceArr = cart.map(
      (product) => product.quantity * product.price
    );
    setTotalPrice(
      totalPriceArr.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      )
    );
  }, [cart]);

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 2 }}>
      <Typography variant="h4" component={"h1"} textAlign="center" gutterBottom>
        Your Shopping Cart
      </Typography>

      {!cart.length && (
        <Typography
          variant="body1"
          color={"error"}
          component={"p"}
          textAlign="center"
          gutterBottom
        >
          No Items in your cart!{" "}
          <Link href="/" style={{ fontWeight: "bold" }}>
            Continue Shopping
          </Link>
        </Typography>
      )}

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
          {cart.map((product) => (
            <CartProduct
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.image}
              quantity={product.quantity}
              price={product.price}
            />
          ))}
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
              ${totalPrice}
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
