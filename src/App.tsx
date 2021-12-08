import { ThemeProvider } from "@mui/material";
import LightTheme from "Themes/LightTheme";

export default function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <div>Hello, World!</div>
    </ThemeProvider>
  );
}
