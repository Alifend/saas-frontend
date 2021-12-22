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
  precio: "",
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

const EditarProducto = () => {
  const [roles, setRoles] = useState([]);
  const [domain, setDomain] = useState("");
  const [producto, setProducto] = useState({});
  let params = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    const response = window.location.host.split(".")[0];
    setDomain(response);
    getProduct();
  }, []);
  const classes = useStyles();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: productSchema,
    onSubmit: (values) => {
      editProduct(values);
    },
  });

  const getProduct = async () => {
    const response = await ProductosServices.getProducto(params.productoId);
    const msg = response.statusText;
    if (msg === "OK") {
      setProducto(response.data);
    } else {
      alert(msg);
    }
  };
  const editProduct = async (values) => {
    const response = await ProductosServices.updateProducto(values);
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
        Registrar
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
                id="precio"
                name="precio"
                label="precio"
                value={formik.values.precio}
                onChange={formik.handleChange}
                error={formik.touched.precio && Boolean(formik.errors.precio)}
                helperText={formik.touched.precio && formik.errors.precio}
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
              Editar Producto!
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EditarProducto;
