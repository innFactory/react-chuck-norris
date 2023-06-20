import { Box, Divider, Paper, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

interface AuthPaperProps extends PropsWithChildren {
  title: string;
  subtitle: string;
}

export const AuthPaper: React.FC<AuthPaperProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <Paper
      elevation={6}
      sx={{
        padding: 4,
        minWidth: "450px",
      }}
    >
      <Typography variant="h6" textAlign="center">
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginY: 2,
        }}
      >
        <img src="chuck.png" height={160} />
        <Box
          sx={{
            marginTop: 2,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Divider sx={{ width: "70%" }} />
        </Box>
      </Box>
      <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
        {subtitle}
      </Typography>
      {children}
    </Paper>
  );
};
