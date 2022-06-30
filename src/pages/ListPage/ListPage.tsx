import {
  Card,
  CardContent,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ObjectStyle } from "../../@types";
import { ImgProductWithFloatingBtn, PageContainer } from "../../components";
import useNumeral from "../../hooks/useNumeral";
import { Product, Size, Tissue } from "../../services";
import { randomEnumValue, randomNumber, sizes, tissues } from "../../util";

const styles: ObjectStyle = {
  clampOverflow: {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "3",
  },
  cardContent: {
    justifyContent: "center",
    alignItems: "center",
    height: "max-content",
    padding: "1.3em",
    paddingTop: "0",
  },
};

function ListTooltip({ product }: { product: Product }) {
  return (
    <Stack>
      {/* Size */}
      <Typography color="inherit">{sizes[product.size]}</Typography>

      {/* Tissue */}
      <span>{tissues[product.tissue]}</span>

      {/* Desc */}
      <Typography component="em" textAlign="left">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam vel
        illum earum sapiente facere omnis, architecto quidem optio. Nisi quaerat
        consequuntur atque dolorem aliquid laboriosam dignissimos voluptate
        repudiandae quisquam illo.
      </Typography>
    </Stack>
  );
}

function ToProduct({ children, id }: { children: ReactNode; id: number }) {
  return <Link to={`/list/${id}`}>{children}</Link>;
}

function ListItem({ index }: { index: number }) {
  const { currency } = useNumeral();

  const product: Product = {
    id: index,
    name: `Item ${index + 1} com nome extenso para teste do overflow em
    relação a seu pai que é um pseudo-cartão`,
    description: `
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam vel
        illum earum sapiente facere omnis, architecto quidem optio. Nisi quaerat
        consequuntur atque dolorem aliquid laboriosam dignissimos voluptate
        repudiandae quisquam illo.`,
    images: [`https://picsum.photos/1200/1400?random=${index}`],
    price: randomNumber(150, 2500),
    size: randomEnumValue(Size),
    tissue: randomEnumValue(Tissue),
  };

  return (
    <Card variant="outlined">
      <Tooltip arrow title={<ListTooltip product={product} />}>
        <CardContent component={Stack} sx={styles.cardContent} spacing={2}>
          {/* Image */}
          <ToProduct id={product.id}>
            <ImgProductWithFloatingBtn product={product} />
          </ToProduct>

          {/* Name, Price */}
          <Stack width="100%" alignItems="start" spacing={1}>
            {/* Name */}
            <ToProduct id={product.id}>
              <Typography
                variant="body1"
                textAlign="start"
                style={styles.clampOverflow}
              >
                {product.name}
              </Typography>
            </ToProduct>

            {/* Price */}
            <ToProduct id={product.id}>
              <Typography variant="subtitle1">
                {currency(product.price)}
              </Typography>
            </ToProduct>
          </Stack>
        </CardContent>
      </Tooltip>
    </Card>
  );
}

export default function ListPage() {
  return (
    <PageContainer>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {Array.from(Array(20)).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
            <ListItem index={index} />
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
}
