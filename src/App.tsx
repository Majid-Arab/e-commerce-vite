import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import Home from "./pages/Home";
import { Products } from "./components/products/Products";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Home />
      <Products />
    </MantineProvider>
  );
}
