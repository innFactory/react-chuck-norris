import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ChucksAppBar from "../src/app/components/ChucksAppBar";
import { RandomJoke } from "../src/jokes/components/RandomJoke";

export default function Home() {
  return (
    <>
      <ChucksAppBar />
      <Container maxWidth="xl">
        <Typography variant="h1">Home</Typography>
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RandomJoke />
        </Box>
      </Container>
    </>
  );
}
