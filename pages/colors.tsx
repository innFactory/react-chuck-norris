import { Box, Container, Typography } from "@mui/material";
import ChucksAppBar from "../src/app/components/ChucksAppBar";
import { ColorTable } from "../src/randomColor/components/ColorTable";
import { RandomColorGenerator } from "../src/randomColor/components/RandomColorGenerator";

export default function Colors() {
  return (
    <>
      <ChucksAppBar />
      <Box
        sx={{
          display: "flex",
          height: (theme) =>
            `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h1">Colors</Typography>
          <Box
            sx={{
              my: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RandomColorGenerator />
          </Box>
        </Container>
        <Box sx={{ display: "flex", minHeight: "100%" }}>
          <ColorTable />
        </Box>
      </Box>
    </>
  );
}
