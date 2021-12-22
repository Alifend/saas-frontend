import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import userSchema from "../schemas/userSchema";
import { makeStyles } from "@mui/styles";
import UserServices from "../services/UserServices";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import productSchema from "../schemas/productSchema";
import ProductosServices from "../services/ProductosServices";
const initialValues = {
  nombre: "",
  descripcion: "",
  price: "",
  imagen: "",
  stock: "",
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 230,
    maxHeight: 80,
    marginTop: 0,
    height: 45,
  },
  emailControl: {
    minWidth: "94%",
    marginTop: 0,
    height: 45,
  },
  button: {
    marginTop: 20,
  },
}));

const CrearProducto = () => {
  const [domain, setDomain] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const response = window.location.host.split(".")[0];
    setDomain(response);
  }, []);
  const classes = useStyles();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: productSchema,
    onSubmit: (values) => {
      postProduct(values);
    },
  });

  const postProduct = async (values) => {
    const response = await ProductosServices.postProducto(values);
    const msg = response.statusText;
    if (msg === "OK") {
      navigate(`/almacen`);
    } else {
      alert(msg);
    }
  };
  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h6" gutterBottom>
        Crear Producto
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
              <TextField
                id="nombre"
                name="nombre"
                label="Nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
              <TextField
                id="descripcion"
                name="descripcion"
                label="Descripcion"
                value={formik.values.descripcion}
                onChange={formik.handleChange}
                error={
                  formik.touched.descripcion &&
                  Boolean(formik.errors.descripcion)
                }
                helperText={
                  formik.touched.descripcion && formik.errors.descripcion
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
              <TextField
                id="price"
                name="price"
                label="Price"
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
              <TextField
                id="stock"
                name="stock"
                label="Stock"
                value={formik.values.stock}
                onChange={formik.handleChange}
                error={formik.touched.stock && Boolean(formik.errors.stock)}
                helperText={formik.touched.stock && formik.errors.stock}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.emailControl}>
              <TextField
                id="imagen"
                name="imagen"
                label="Imagen"
                type="imagen"
                value={formik.values.imagen}
                onChange={formik.handleChange}
                error={formik.touched.imagen && Boolean(formik.errors.imagen)}
                helperText={formik.touched.imagen && formik.errors.imagen}
              />
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              type="submit"
            >
              Crear Producto!
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CrearProducto;
