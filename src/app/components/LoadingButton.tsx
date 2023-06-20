// prettier-ignore
import { Button, ButtonProps, CircularProgress } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import * as React from "react";

interface Props extends ButtonProps {
  loading?: boolean;
  red?: boolean;
}

export function LoadingButton(props: Props) {
  const { loading, red } = props;
  React.useEffect(() => {}, []);

  const theme = useTheme();

  return (
    <Button
      {...props}
      disabled={props.disabled || loading}
      sx={{
        ...(props.sx || {}),
        ...(loading
          ? {
              paddingLeft: 8,
              paddingRight: 8,
            }
          : {}),
        ...(red
          ? props.variant === "outlined"
            ? {
                borderColor: theme.palette.error.main,
                color: theme.palette.error.main,
                "&:hover": {
                  borderColor: theme.palette.error.dark,
                  color: theme.palette.error.dark,
                },
              }
            : {
                backgroundColor: theme.palette.error.main,
                color: "white",
                "&:hover": {
                  backgroundColor: theme.palette.error.dark,
                },
              }
          : {}),
      }}
    >
      {loading ? (
        <>
          <CircularProgress
            sx={{ color: "inherit", marginRight: 4 }}
            size={12}
            thickness={4}
          />
          {props.children}
        </>
      ) : (
        props.children
      )}
    </Button>
  );
}
