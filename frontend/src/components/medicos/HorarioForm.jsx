import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Paper,
  TableContainer
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  obtenerHorarios,
  registrarHorario,
  actualizarHorario,
  eliminarHorario
} from "../../services/horarioService";

const dias = [
  { id: 1, nombre: "Lunes" },
  { id: 2, nombre: "Martes" },
  { id: 3, nombre: "Miércoles" },
  { id: 4, nombre: "Jueves" },
  { id: 5, nombre: "Viernes" },
  { id: 6, nombre: "Sábado" },
  { id: 7, nombre: "Domingo" }
];

const horarioInicial = {
  IdHorario: null,
  IdMedico: null,
  DiaSemana: 1,
  HoraInicio: "08:00",
  HoraFin: "16:00",
  DuracionConsulta: 30
};

export default function HorarioForm({ open, onClose, medico }) {

  const [horario, setHorario] = useState(horarioInicial);
  const [horarios, setHorarios] = useState([]);

  useEffect(() => {

    if (open && medico) {

      cargarHorarios();

      setHorario({
        ...horarioInicial,
        IdMedico: medico.IdMedico
      });

    }

  }, [open, medico]);

  const cargarHorarios = async () => {

    try {

      const response = await obtenerHorarios(medico.IdMedico);

      setHorarios(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  const guardar = async () => {
    try {

      if (horario.IdHorario) {

        await actualizarHorario(
          horario.IdHorario,
          horario
        );

      } else {

        await registrarHorario(horario);

      }

      await cargarHorarios();

      setHorario({
        ...horarioInicial,
        IdMedico: medico.IdMedico
      });

    } catch (error) {

      console.error(error);
    }
  };

  const editar = (item) => {
    setHorario(item);
  };

  const eliminar = async (id) => {
    if (!window.confirm("¿Desea eliminar el horario?")) return;

    try {

      await eliminarHorario(id);
      cargarHorarios();

    } catch (error) {

      console.error(error);
    }
  };

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >

      <DialogTitle>
        Horarios del Médico
        {medico && (
          <>
            <br />
            <small>
              {medico.Nombre} {medico.ApellidoPaterno}
            </small>
          </>
        )}
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Día"

              value={horario.DiaSemana}

              onChange={(e) =>
                setHorario({
                  ...horario,
                  DiaSemana: Number(e.target.value)
                })
              }
            >
              {dias.map((dia) => (
                <MenuItem
                  key={dia.id}
                  value={dia.id}
                >
                  {dia.nombre}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="time"
              label="Hora Inicio"
              InputLabelProps={{ shrink: true }}
              value={horario.HoraInicio}
              onChange={(e) =>
                setHorario({
                  ...horario,
                  HoraInicio: e.target.value
                })
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="time"
              label="Hora Fin"
              InputLabelProps={{ shrink: true }}
              value={horario.HoraFin}
              onChange={(e) =>
                setHorario({
                  ...horario,
                  HoraFin: e.target.value
                })
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>

            <TextField
              select
              fullWidth
              label="Duración"

              value={horario.DuracionConsulta}

              onChange={(e) =>
                setHorario({
                  ...horario,
                  DuracionConsulta: Number(e.target.value)
                })
              }
            >

              <MenuItem value={15}>15 minutos</MenuItem>
              <MenuItem value={20}>20 minutos</MenuItem>
              <MenuItem value={30}>30 minutos</MenuItem>
              <MenuItem value={45}>45 minutos</MenuItem>
              <MenuItem value={60}>60 minutos</MenuItem>

            </TextField>
          </Grid>
        </Grid>

        <Button
          sx={{ mt: 3, mb: 3 }}
          variant="contained"
          onClick={guardar}
        >
          {horario.IdHorario ? "Actualizar" : "Guardar"}
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Día</TableCell>
                <TableCell>Hora Inicio</TableCell>
                <TableCell>Hora Fin</TableCell>
                <TableCell>Duración</TableCell>
                <TableCell align="center">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {horarios.map((item) => (
                <TableRow key={item.IdHorario}>
                  <TableCell>
                    {dias.find(d => d.id === item.DiaSemana)?.nombre}
                  </TableCell>
                  <TableCell>
                    {item.HoraInicio}
                  </TableCell>
                  <TableCell>
                    {item.HoraFin}
                  </TableCell>
                  <TableCell>
                    {item.DuracionConsulta} min
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => editar(item)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => eliminar(item.IdHorario)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}