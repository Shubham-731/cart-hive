import { Box, Button, Typography } from "@mui/material";
import ProductCard from "./Card";
import ProductCardSkeleton from "./CardSkeleton";

interface Props {
  title: string;
}

const ProductSection = ({ title }: Props) => {
  return (
    <Box my={4} mb={8} component={"section"}>
      <Typography variant="h5" fontWeight={"bold"} textAlign={"center"}>
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          my: 4,
        }}
      >
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCardSkeleton />
      </Box>
      <Button
        color="secondary"
        variant="outlined"
        sx={{ display: "block", margin: "0 auto" }}
      >
        Show more
      </Button>
    </Box>
  );
};

export default ProductSection;
