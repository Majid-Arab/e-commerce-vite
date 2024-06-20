import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Layout.tsx";
import App from "./App.tsx";
import Products from "./components/products/Products.tsx";
import ProductDetail from "./components/products/ProductDetail.tsx";
import Cart from "./components/products/Cart.tsx";
import { theme } from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
            <Route path="products" element={<Products />} />
            <Route path="cart" element={<Cart />} />
            <Route path="products/:id" element={<ProductDetail />} />
          </Route>
        </Routes>
      </Router>
    </MantineProvider>
  </React.StrictMode>
);
