import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductosServices from "../services/ProductosServices";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Fab from "@mui/material/Fab";
import { Remove, Add } from "@mui/icons-material";

const styles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
const ProductDetail = () => {
  let params = useParams();
  const [producto, setProducto] = useState({});
  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async (values) => {
    const response = await ProductosServices.getSingleProducto(
      params.productoId
    );
    const msg = response.statusText;
    if (msg === "OK") {
      setProducto(response.data); // ojo, es response.data
    } else {
      alert("msg");
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "50px", height: "500px" }}>
      {producto && (
        <Card style={{ height: "350px" }}>
          <CardContent style={{ height: "calc(100% - 50px)" }}>
            <Box sx={{ display: "flex", height: "100%" }}>
              <Box
                style={{
                  width: "50%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={producto.imagen}
                  style={{
                    width: "300px",
                    height: "250px",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />
              </Box>
              <Box sx={styles} style={{ width: "50%" }}>
                <Typography variant="h5" component="div">
                  {producto.nombre}
                </Typography>
                <Typography variant="body2">{producto.descripcion}</Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {producto.price}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {producto.stock} unidades restantes
                </Typography>
                <Box>
                  <Button>
                    <Fab
                      color="primary"
                      style={{ height: "40px", width: "40px" }}
                      aria-label="add"
                    >
                      <Add />
                    </Fab>
                  </Button>
                  <Button>
                    <Fab
                      color="secondary"
                      style={{ height: "40px", width: "40px" }}
                      aria-label="add"
                    >
                      <Remove />
                    </Fab>
                  </Button>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default ProductDetail;
