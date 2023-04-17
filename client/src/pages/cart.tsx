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
import { useRouter } from "next/router";
import runFireworks from "@/utils/runFirewalls";
import { GetServerSidePropsContext } from "next";

type CartProps = {
  query:
    | { success: true; canceled: false }
    | { success: false; canceled: true };
};

const CartProduct = ({ title, id, image, quantity, price }: Cart) => {
  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      <Box sx={{ position: "relative", width: "100px", height: "100px" }}>
        <Image src={image} alt={title} fill={true} />
      </Box>

      <Box>
        <Link
          href={`/products/${id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography
            variant="h6"
            sx={{
              width: "100%",
              marginBottom: 1,
              ":hover": {
                textDecoration: "underline",
              },
            }}
            maxWidth="20rem"
            noWrap
          >
            {title}
          </Typography>
        </Link>

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

  const { cart, clearCart, createCheckout } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (router.query.success) {
      runFireworks();
      alert("Successfully ordered!");
      clearCart();
    }

    if (router.query.canceled) {
      alert("Order canceled!");
      router.push("/cart");
    }
  }, [router.query]);

  useEffect(() => {
    if (cart.length) {
      const totalPriceArr = cart.map(
        (product) => product.quantity * product.price
      );
      setTotalPrice(
        totalPriceArr.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        )
      );
    }
  }, [cart]);

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 2 }}>
      <Typography variant="h4" component={"h1"} textAlign="center" gutterBottom>
        Your Shopping Cart
      </Typography>

      {cart.length ? (
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
              onClick={createCheckout}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </Paper>
      ) : (
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
    </Container>
  );
};

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  return {
    props: {
      query,
    },
  };
}

export default Cart;
