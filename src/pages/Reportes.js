import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import {
  Remove,
  Add,
  ShoppingCart,
  Person,
  VerifiedUser,
} from "@mui/icons-material";
import { TextField } from "@mui/material";
import ShowReporte from "../components/ShowReporte";

function PricingContent() {
  const [consulta, setConsulta] = useState({
    fechaInicial: "",
    fechaFinal: "",
  });
  const [data, setData] = useState({ data: [], loading: true });
  const [openReporte, setOpenReporte] = useState(false);

  const handleChange = () => {
    setOpenReporte(!openReporte);
  };

  const getProducts = () => {
    setData({
      data: [
        { nombre: "Arroz", precio: "500", stock: 20 },
        { nombre: "Arroz", precio: "500", stock: 20 },
        { nombre: "Arroz", precio: "500", stock: 20 },
        { nombre: "Arroz", precio: "500", stock: 20 },
        { nombre: "Arroz", precio: "500", stock: 20 },
        { nombre: "Arroz", precio: "500", stock: 20 },
        { nombre: "Arroz", precio: "500", stock: 20 },
        { nombre: "Arroz", precio: "500", stock: 20 },
        { nombre: "Arroz", precio: "500", stock: 20 },
        { nombre: "Arroz", precio: "500", stock: 20 },
      ],
      loading: false,
    });
    handleChange();
    // aquí llamamos a la api y traemos los datos con "consulta"
  };
  const getClients = () => {
    // aquí llamamos a la api y traemos los datos con "consulta"
  };
  const getUsers = () => {
    // aquí llamamos a la api y traemos los datos con "consulta"
  };

  const tiers = [
    {
      title: "Top productos",
      icon: ShoppingCart,
      buttonText: "Generar reporte",
      buttonVariant: "contained",
      onClick: getProducts,
    },
    {
      title: "Top clientes",
      icon: Person,
      buttonText: "Generar reporte",
      buttonVariant: "contained",
      onClick: getClients,
    },
    {
      title: "Últimos usuarios",
      icon: VerifiedUser,
      buttonText: "Generar reporte",
      buttonVariant: "contained",
      onClick: getUsers,
    },
  ];
  return (
    <>
      {!data.loading && (
        <ShowReporte
          open={openReporte}
          handleChange={handleChange}
          data={data.data}
        />
      )}
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          paddingTop: "30px",
        }}
      >
        <TextField
          value={consulta.fechaInicial}
          onChange={(e) =>
            setConsulta({ ...consulta, fechaInicial: e.target.value })
          }
          type="date"
        />
        <TextField
          value={consulta.fechaFinal}
          onChange={(e) =>
            setConsulta({ ...consulta, fechaFinal: e.target.value })
          }
          type="date"
        />
      </Box>
      {/* Hero unit */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 4, pb: 3 }}
      ></Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  titleTypographyProps={{ align: "center" }}
                  action={tier.title === "Pro" ? <StarIcon /> : null}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "150px",
                  }}
                >
                  {<tier.icon style={{ height: "60px", width: "60px" }} />}
                </CardContent>
                <CardActions>
                  <Button
                    onClick={tier.onClick}
                    fullWidth
                    variant={tier.buttonVariant}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default function Pricing() {
  return <PricingContent />;
}
