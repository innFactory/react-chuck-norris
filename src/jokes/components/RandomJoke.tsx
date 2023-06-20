import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Box, Button, Paper, Skeleton, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getRandomJoke } from "../api/jokesApi";

interface RandomJokeProps {}

export const RandomJoke: React.FC<RandomJokeProps> = ({}) => {
  const { isLoading, data, refetch } = useQuery({
    ...getRandomJoke(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const onNewJokeButton = () => {
    refetch();
  };

  return (
    <Box>
      <Paper sx={{ padding: 2, width: 600 }}>
        {isLoading ? (
          <Skeleton sx={{ width: "100%" }} />
        ) : (
          <Typography>{data?.data.value}</Typography>
        )}
      </Paper>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "row-reverse",
          marginTop: 2,
        }}
      >
        <Button
          onClick={onNewJokeButton}
          variant="contained"
          endIcon={<AutorenewIcon />}
        >
          New Joke
        </Button>
      </Box>
    </Box>
  );
};
