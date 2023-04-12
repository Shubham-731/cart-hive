import * as React from "react";
import ProductSection from "@/components/Product/Section";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <ProductSection title="Most sold products" />
      <ProductSection title="Highest rated products" />
    </Container>
  );
}
