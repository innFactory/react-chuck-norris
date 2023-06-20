import AutorenewIcon from "@mui/icons-material/Autorenew";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { colorsState } from "../state/colorsState";

export const RandomColorGenerator: React.FC = () => {
  const [currentColor, setCurrentColor] = useState(getRandomColor());
  const [colorList, setColorList] = useRecoilState(colorsState);

  const onNewRandomColor = () => {
    setCurrentColor(getRandomColor());
  };

  const addColorToList = () => {
    setColorList([...colorList, { hex: currentColor }]);
    setCurrentColor(getRandomColor());
  };

  return (
    <Box>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 2,
          width: 400,
          height: 400,
        }}
      >
        <Typography variant="h6">{`Random Color ${currentColor}`}</Typography>
        <Box
          sx={{
            backgroundColor: currentColor,
            display: "flex",
            width: "100%",
            height: "100%",
            borderRadius: 12,
          }}
        />
      </Paper>
      <Box
        sx={{ marginTop: 2, display: "flex", justifyContent: "space-between" }}
      >
        <Button
          onClick={onNewRandomColor}
          variant="contained"
          endIcon={<AutorenewIcon />}
        >
          New Random Color
        </Button>
        <Button
          onClick={addColorToList}
          variant="outlined"
          endIcon={<FavoriteBorderIcon />}
        >
          Add Color to List
        </Button>
      </Box>
    </Box>
  );
};

function getRandomColor(): string {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
