import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ObjectStyle } from "../../@types";
import { PageContainer } from "../../components";
import ImgProduct from "../../components/general/ImgProduct";
import useNumeral from "../../hooks/useNumeral";
import { randomElement, randomNumber, sizes, tissue } from "../../util";

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
  },
};

function ListTooltip() {
  return (
    <Stack>
      {/* Size */}
      <Typography color="inherit">{randomElement(sizes)}</Typography>

      {/* Tissue */}
      <span>{randomElement(tissue)}</span>

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

function ListItem({ index }: { index: number }) {
  const { currency } = useNumeral();

  return (
    <Card variant="outlined">
      <CardActionArea>
        <Link to={`/list/${index}`}>
          <Tooltip arrow title={<ListTooltip />}>
            <CardContent component={Stack} sx={styles.cardContent} spacing={2}>
              {/* Image */}
              <ImgProduct
                alt={`Item ${index + 1}`}
                src={`https://picsum.photos/1200/1400?random=${index}`}
              ></ImgProduct>
              {/* Name, Price */}
              <Stack width="100%" alignItems="start" spacing={1}>
                {/* Name */}
                <Typography
                  component="h4"
                  textAlign="start"
                  style={styles.clampOverflow}
                >
                  Item {index + 1} com nome extenso para teste do overflow em
                  relação a seu pai que é um pseudo-cartão
                </Typography>

                {/* Price */}
                <Typography component="h2">
                  {currency(randomNumber(20, 1500))}
                </Typography>
              </Stack>
            </CardContent>
          </Tooltip>
        </Link>
      </CardActionArea>
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
