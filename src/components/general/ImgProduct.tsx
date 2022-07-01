import { Paper, PaperProps } from "@mui/material";
import { ObjectStyle } from "../../@types";

interface ImgProductProps {
  alt?: string;
  src: string;
  width?: string;
  height?: string;
  paper?: PaperProps;
}

const styles: ObjectStyle = {
  paper: {
    display: "flex",
    maxWidth: "fit-content",
    maxHeight: "fit-content",
  },
  img: {
    maxWidth: "100%",
    width: "auto",
    height: "auto",
    borderRadius: "5px",
  },
};

export default function ImgProduct({
  alt,
  src,
  width,
  height,
  paper = {},
}: ImgProductProps) {
  width = (width || height) ?? undefined;
  height = (height || width) ?? undefined;
  const minWidth = width;
  const minHeight = height;

  return (
    <Paper
      {...{
        ...paper,
        sx: {
          ...styles.paper,
          width,
          height,
          minWidth,
          minHeight,
          ...paper?.sx,
          justifyContent: "center",
        },
      }}
    >
      <img alt={alt || src} src={src} style={styles.img}></img>
    </Paper>
  );
}
