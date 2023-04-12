import {
  Box,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";

const OrderedProduct = () => {
  return (
    <Paper
      elevation={1}
      sx={{
        padding: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        flexWrap: "wrap",
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: 250,
          width: 250,
        }}
      >
        <Image
          src="https://source.unsplash.com/featured/?e-commerce,cart,marketting,product"
          alt="Ordered product"
          fill={true}
          style={{ borderRadius: "0.5rem" }}
        />
      </Box>

      <Stack spacing={1} width="100%" position="relative" maxWidth="50rem">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" component="p" color="Highlight">
            Order ID: AXVM2932
          </Typography>
          <Typography
            variant="caption"
            component="div"
            bgcolor="green"
            color="white"
            fontWeight="bold"
            textTransform="uppercase"
            sx={{
              padding: "0.25rem 1.5rem",
              borderRadius: "0.5rem",
              fontSize: "18px",
            }}
          >
            #ORDERED
          </Typography>
        </Box>

        <Typography variant="h5" component="p">
          Product name
        </Typography>
        <Typography
          variant="body2"
          component="p"
          color="GrayText"
          width="fit-content"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero error
          quibusdam nemo pariatur dicta exercitationem consectetur eum,
          voluptatum architecto rerum excepturi doloremque nulla soluta optio
          quia. Molestias nobis aliquam voluptas animi minima!
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            color="error"
            fontWeight="bold"
            variant="h6"
            component="p"
          >
            Price: $499.00
          </Typography>
          <Typography variant="body1" component="p" color="GrayText">
            Order Date: 15 April 2023
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

const Orders = () => {
  return (
    <Container maxWidth="lg" sx={{ padding: "2rem 0" }}>
      <Typography variant="h4" component="h1" mb={2} textAlign="center">
        Your Orders
      </Typography>

      <Stack spacing={2} divider={<Divider />}>
        <OrderedProduct />
        <OrderedProduct />
        <OrderedProduct />
        <OrderedProduct />
      </Stack>
    </Container>
  );
};

export default Orders;
