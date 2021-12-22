import { Container, Grid, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Producto from "../components/Producto";
import { useNavigate } from "react-router-dom";
import ProductosServices from "../services/ProductosServices";

// const data = [
//   {
//     id: 1,
//     nombre: "Arroz",
//     descripcion: "Delicio arrocito Diana",
//     imagen:
//       "https://www.clikisalud.net/wp-content/uploads/2021/01/vida-util-arroz-seco-crudo.jpg",
//     precio: "$300",
//   },
//   {
//     id: 2,
//     nombre: "Papa",
//     descripcion: "Papa parda",
//     imagen: "https://www.sqm.com/wp-content/uploads/2018/04/papa-992x550.jpg",
//     precio: "$200",
//   },
//   {
//     id: 3,
//     nombre: "Maiz",
//     descripcion: "Maiz del campo",
//     imagen:
//       "https://www.caracteristicas.co/wp-content/uploads/2018/10/maiz-2-1-e1581908276964.jpg",
//     precio: "$10000",
//   },
// ];
const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await ProductosServices.getProductos();
    const productsTemps = response.data;
    setProducts(productsTemps);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 300,
          height: 350,
        },
      }}
    >
      {products && products.map((producto) => <Producto {...producto} />)}
    </Box>
  );
};

export default Products;
