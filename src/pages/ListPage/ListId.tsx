import { useParams } from "react-router-dom";
import { Divider, Stack, Typography } from "@mui/material";
import {
  AddProductToCartBtn,
  ImgProductWithFloatingBtn,
  PageContainer,
} from "../../components";
import useNumeral from "../../hooks/useNumeral";
import { Product } from "../../services";
import { sizes, tissues } from "../../util";
import { Box } from "@mui/system";
import { ObjectStyle } from "../../@types";
import { useEffect, useState } from "react";
import useRequest from "../../hooks/useRequest";
import api from "../../services/api";

const styles: ObjectStyle = {
  addProduct: {
    position: "fixed",
    bottom: "10%",
    left: "90%",
  },
};

export default function ListId() {
  const { id = 0 } = useParams() ?? {};

  const { currency } = useNumeral();
  const { request, loading } = useRequest();
  const [product, setProduct] = useState<Product>({} as Product);

  useEffect(() => {
    if (!product.id) {
      request(async () => {
        await api.get<Product>(`/products/${id}`).then((res) => {
          setProduct(res.data);
        });
      });
    }
  });

  return (
    <PageContainer backRoute loading={loading}>
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
