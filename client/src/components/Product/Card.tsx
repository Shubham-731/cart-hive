import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Rating } from "@mui/material";
import Link from "next/link";

export default function ProductCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link href={`/products/asdf`} style={{ textDecoration: "none" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://source.unsplash.com/featured/?ecommerce,cart,marketting,product"
            alt="green iguana"
          />
          <CardContent>
            <Typography variant="h6" component="div" color="text.primary">
              Product name
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Product description: Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Placeat animi deserunt iste error ratione
              officia, beatae accusantium enim eligendi minima, rem at eius
              assumenda.
            </Typography>
            <Typography color="secondary" fontWeight={"bold"} my={0.25}>
              Price: $24.99
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography component="legend" color={"text.primary"}>
                Ratings:
              </Typography>
              <Rating name="read-only" value={3.5} precision={0.5} readOnly />
              <Typography
                component="legend"
                variant="body2"
                color="text.secondary"
              >
                (240)
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}
