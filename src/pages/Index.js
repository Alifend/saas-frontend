import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import Login from "./Login";
import ProductDetail from "./ProductDetail";
import Products from "./Products";
import Registro from "./Registro";
import Almacen from "./Almacen";
import EditarProducto from "./EditarProducto";
import CrearProducto from "./CrearProducto";
import Reportes from "./Reportes";
import Pagos from "./Pagos";

const Index = () => {
  return (
    <div>
      <Layout />
      <Routes>
        <Route path="/productos" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productos/:productoId" element={<ProductDetail />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/almacen" element={<Almacen />} />
        <Route path="/almacen/:productoId" element={<EditarProducto />} />
        <Route path="/productos/crear" element={<CrearProducto />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/pagos" element={<Pagos />} />
      </Routes>
    </div>
  );
};

export default Index;
