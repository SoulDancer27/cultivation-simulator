import React from "react";
import MuiAlert, { AlertColor } from "@mui/material/Alert";
import { Snackbar, SnackbarCloseReason } from "@mui/material";

// Props for the alert
export type AlertProps = {
  onClose: (event: any, reason?: SnackbarCloseReason) => void;
  state: AlertState;
  autoHideDuration?: number;
};

// Styled alert component
export function Alert({ onClose, autoHideDuration, state }: AlertProps) {
  const { isOpened, severity, text } = state;

  return (
    <Snackbar
      open={isOpened}
      autoHideDuration={autoHideDuration ? autoHideDuration : 4000}
      onClose={onClose}
    >
      <MuiAlert
        severity={severity}
        onClose={onClose}
        elevation={6}
        variant="filled"
      >
        {text}
      </MuiAlert>
    </Snackbar>
  );
}

// Alert inner state
export type AlertState = {
  severity?: AlertColor;
  text?: string;
  isOpened?: boolean;
};

// Custom hook to handle Alert state
export function useAlert() {
  const [state, setState] = React.useState<AlertState>({
    isOpened: false,
    text: "Text Missing",
    severity: "error",
  });

  // Function to close alert on click
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ severity: state.severity, text: state.text, isOpened: false });
  };

  // Merging version for export
  const setAlertState = (newState: AlertState) => {
    setState({ ...state, ...newState });
  };

  // Renamed for usability outside of alert
  return { alertState: state, setAlertState, handleAlertClose: handleClose };
}
