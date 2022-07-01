import {
  Card,
  CardContent,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ObjectStyle } from "../../@types";
import { ImgProductWithFloatingBtn, PageContainer } from "../../components";
import useNumeral from "../../hooks/useNumeral";
import useRequest from "../../hooks/useRequest";
import { Product } from "../../services";
import api from "../../services/api";
import { sizes, tissues } from "../../util";

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
        {product.description}
      </Typography>
    </Stack>
  );
}

function ToProduct({
  children,
  id,
  hoverDisabled,
}: {
  children: ReactNode;
  hoverDisabled?: boolean;
  id: number;
}) {
  return (
    <Link className={!hoverDisabled ? "hover-link" : ""} to={`/list/${id}`}>
      {children}
    </Link>
  );
}

function ListItem({ product }: { product: Product }) {
  const { currency } = useNumeral();

  return (
    <Card variant="outlined">
      <Tooltip arrow title={<ListTooltip product={product} />}>
        <CardContent component={Stack} sx={styles.cardContent} spacing={2}>
          {/* Image */}
          <ToProduct id={product.id} hoverDisabled>
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
  const { request, loading } = useRequest();

  const [list, setState] = useState<Product[]>([]);

  useEffect(() => {
    if (!list.length) {
      request(
        async () =>
          await api.get<Product[]>("/products").then((res) => {
            setState(res.data);
          })
      );
    }
  });

  return (
    <PageContainer loading={loading}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {list.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={product.id}>
            <ListItem product={product} />
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
}
