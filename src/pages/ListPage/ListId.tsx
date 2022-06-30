import { useParams } from "react-router-dom";
import { Divider, Stack, Typography } from "@mui/material";
import {
  AddProductToCartBtn,
  ImgProductWithFloatingBtn,
  PageContainer,
} from "../../components";
import useNumeral from "../../hooks/useNumeral";
import { Product, Size, Tissue } from "../../services";
import { sizes, tissues, randomEnumValue, randomNumber } from "../../util";
import { Box } from "@mui/system";
import { ObjectStyle } from "../../@types";

const styles: ObjectStyle = {
  addProduct: {
    position: "fixed",
    bottom: "5%",
    left: "90%",
  },
};

export default function ListId() {
  const { id = 0 } = useParams() ?? {};

  const { currency } = useNumeral();

  const product: Product = {
    id: Number(id),
    description: "Bláblá",
    images: ["https://picsum.photos/800/1000"],
    name: "Nome do produtcho",
    price: randomNumber(20, 102500),
    size: randomEnumValue(Size),
    tissue: randomEnumValue(Tissue),
  };

  return (
    <PageContainer backRoute>
      <Stack direction="row" height="100%" spacing={2}>
        {/* img */}
        <ImgProductWithFloatingBtn product={product} />

        {/* name, description */}
        <Stack position="relative" bottom="0.6em" width="100%">
          {/* name */}
          <Typography variant="h3" textAlign="left">
            {product.name}
          </Typography>

          {/* price */}
          <Typography variant="h4" textAlign="left">
            {currency(product.price)}
          </Typography>

          {/* size, tissue */}
          <Stack
            direction="row"
            spacing={1}
            mb={1}
            ml="1px"
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Typography variant="h6">{sizes[product.size]}</Typography>
            <Typography variant="h6">{tissues[product.tissue]}</Typography>
          </Stack>

          {/* description */}
          <Typography textAlign="justify" ml="3px">
            {product.description}
          </Typography>
        </Stack>
      </Stack>

      <Box width="fit-content">
        <AddProductToCartBtn
          product={product}
          tooltipPlacement="left"
          style={styles.addProduct}
        />
      </Box>
    </PageContainer>
  );
}
