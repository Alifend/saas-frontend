import {
  Box,
  Button,
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import DeleteHostname from "../components/DeleteHostname";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const data = [
  {
    id: 1,
    hostname: "mitienda",
    estado: true,
  },
  {
    id: 2,
    hostname: "lalca",
    estado: true,
  },
  {
    id: 3,
    hostname: "asdña",
    estado: false,
  },
];

export default function Pagos() {
  const classes = useStyles();
  const [selectedRow, setSelectedRow] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    setOpenDelete(!openDelete);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {};
  return (
    <Box style={{ padding: "30px" }}>
      <DeleteHostname
        open={openDelete}
        handleChange={handleDelete}
        data={selectedRow}
        fetchData={fetchData}
      />

      <Typography variant="h5" style={{ marginBottom: "10px" }}>
        Pagos
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Hostname </TableCell>
              <TableCell align="left">Estado</TableCell>
              <TableCell align="left">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.hostname}
                </TableCell>
                <TableCell align="left">
                  {row.estado ? "Pagado" : "Mora"}
                </TableCell>
                <TableCell align="left">
                  <Button
                    aria-label="edit"
                    onClick={() => navigate(`/almacen/${row.id}`)}
                  >
                    {row.estado ? "Mora" : "Pagar"}
                  </Button>
                  <Button
                    aria-label="edit"
                    onClick={() => {
                      setSelectedRow(row);
                      handleDelete();
                    }}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
