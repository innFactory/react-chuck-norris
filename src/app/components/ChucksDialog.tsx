// prettier-ignore
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import * as React from "react";

interface Props {
  children?: React.ReactNode;
  rightActions?: React.ReactNode;
  leftActions?: React.ReactNode;
  noPadding?: boolean;
  onClose_false?: (close: boolean) => void; // close is always false (for setState methods)
  onClose_undefined?: (selected: any) => void; // selected is always undefined (for setState methods)
  title?: string;
  closeOnClickAway?: boolean;
  titleActions?: React.ReactNode;
  minWidth?: number;
  fullScreen?: boolean;
  dividers?: boolean; // default is set to true
}

export function ChucksDialog(props: Props) {
  const {
    children,
    rightActions,
    onClose_false,
    onClose_undefined,
    title,
    closeOnClickAway,
    leftActions,
    titleActions,
    fullScreen,
    dividers = true,
  } = props;

  const onCloseClickAway = () => {
    if (onClose_false && closeOnClickAway) {
      onClose_false(false);
    } else if (onClose_undefined && closeOnClickAway) {
      onClose_undefined(undefined);
    }
  };

  const onCloseX = () => {
    if (onClose_false) {
      onClose_false(false);
    }

    if (onClose_undefined) {
      onClose_undefined(undefined);
    }
  };

  return (
    <Dialog
      onClose={onCloseClickAway}
      open
      maxWidth="lg"
      fullScreen={fullScreen}
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "saturate(1.8) blur(5px)",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          margin: 0,
          padding: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography variant="h6">{title ?? ""}</Typography>
          <div>{titleActions}</div>
        </Box>
        <IconButton
          data-cy="close"
          aria-label="close"
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={onCloseX}
          size="large"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          padding: props.noPadding ? 0 : 2,
          minWidth: props.minWidth ?? 0,
          display: "flex",
          flexDirection: "column",
        }}
        dividers={dividers}
      >
        {children}
      </DialogContent>
      {(leftActions || rightActions) && (
        <DialogActions
          sx={{
            margin: 0,
            padding: (theme) => theme.spacing(1),
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>{leftActions}</div>
          <div>{rightActions}</div>
        </DialogActions>
      )}
    </Dialog>
  );
}
