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
import { Navigate, useNavigate } from "react-router-dom";
import HostnameServices from "../services/HostnameServices";
const initialValues = {
  email: "",
  nombre: "",
  tipoDocumento: "",
  numeroDocumento: "",
  password: "",
  hostname: "",
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

const Registrar = () => {
  const [roles, setRoles] = useState([]);
  const [domain, setDomain] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const response = window.location.host.split(".")[0];
    setDomain(response);
  }, []);
  const classes = useStyles();
  const handleClick = () => {};

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: userSchema,
    onSubmit: (values) => {
      postUser(values);
    },
  });

  const postUser = async (values) => {
    const response = await HostnameServices.postHostname(values);
    const msg = response.statusText;
    if (msg === "OK") {
      handleClick();
      navigate(`/`);
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
                id="password"
                name="password"
                label="Contraseña"
                value={formik.values.password}
                onChange={formik.handleChange}
                type="password"
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">
                Tipo de documento
              </InputLabel>
              <Select
                id="tipoDocumento"
                name="tipoDocumento"
                label="Tipo de documento"
                value={formik.values.tipoDocumento}
                onChange={formik.handleChange}
                error={
                  formik.touched.tipoDocumento &&
                  Boolean(formik.errors.tipoDocumento)
                }
                helperText={
                  formik.touched.tipoDocumento && formik.errors.tipoDocumento
                }
              >
                <MenuItem value={"C.C"}>C.C</MenuItem>
                <MenuItem value={"C.E"}>C.E</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
              <TextField
                id="numeroDocumento"
                name="numeroDocumento"
                label="Número de documento"
                value={formik.values.numeroDocumento}
                onChange={formik.handleChange}
                error={
                  formik.touched.numeroDocumento &&
                  Boolean(formik.errors.numeroDocumento)
                }
                helperText={
                  formik.touched.numeroDocumento &&
                  formik.errors.numeroDocumento
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.emailControl}>
              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </FormControl>
          </Grid>
          {domain.includes("localhost") && (
            <Grid item xs={12}>
              <FormControl className={classes.emailControl}>
                <TextField
                  id="hostname"
                  name="hostname"
                  label="Hostname"
                  value={formik.values.hostname}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.hostname && Boolean(formik.errors.hostname)
                  }
                  helperText={formik.touched.hostname && formik.errors.hostname}
                />
              </FormControl>
            </Grid>
          )}

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
              Crear usuario
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Registrar;
