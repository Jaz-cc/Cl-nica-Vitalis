import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Snackbar,
  Alert,
  Paper,
  Typography
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

import MedicoTable from "../components/medicos/MedicoTable";
import MedicoForm from "../components/medicos/MedicoForm";

import {
  registrarMedico,
  actualizarMedico
} from "../services/medicoService";


export default function Medicos() {

  const [open, setOpen] = useState(false);
  const [medicoSeleccionado, setMedicoSeleccionado] = useState(null);

  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("success");
  const [snackbar, setSnackbar] = useState(false);

  const [recargar, setRecargar] = useState(false);


  const nuevoMedico = () => {
    setMedicoSeleccionado(null);
    setOpen(true);
  };


  const editarMedico = (medico) => {
    setMedicoSeleccionado(medico);
    setOpen(true);
  };


  const guardarMedico = async (datos) => {

    try {

      if (medicoSeleccionado) {

        await actualizarMedico(
          medicoSeleccionado.IdMedico,
          datos
        );

        setMensaje(
          "Médico actualizado correctamente"
        );

      } else {

        await registrarMedico(datos);

        setMensaje(
          "Médico registrado correctamente"
        );

      }


      setTipoMensaje("success");
      setSnackbar(true);
      setOpen(false);
      setRecargar(!recargar);


    } catch(error){

      console.error(error);

      setTipoMensaje("error");
      setMensaje(
        "Ocurrió un error al guardar"
      );

      setSnackbar(true);

    }

  };


  return (

    <Box
      sx={{
        p: 3,
        backgroundColor: "#f4f7fb",
        minHeight: "100vh"
      }}
    >


      {/* ENCABEZADO */}

      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          background:
            "linear-gradient(135deg,#1976d2,#42a5f5)",
          color:"white"
        }}
      >

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >

          <Box
            display="flex"
            alignItems="center"
            gap={2}
          >

            <MedicalServicesIcon
              sx={{
                fontSize:45
              }}
            />

            <Box>

              <Typography
                variant="h4"
                fontWeight="bold"
              >
                Gestión de Médicos
              </Typography>

              <Typography>
                Administración del personal médico
              </Typography>

            </Box>

          </Box>


          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={nuevoMedico}
            sx={{
              backgroundColor:"white",
              color:"#1976d2",
              fontWeight:"bold",
              px:3,
              py:1.2,
              borderRadius:2,

              "&:hover":{
                backgroundColor:"#e3f2fd"
              }
            }}
          >
            Nuevo Médico
          </Button>


        </Box>

      </Paper>



      {/* TABLA */}

      <Paper
        elevation={2}
        sx={{
          borderRadius:3,
          overflow:"hidden",
          p:2
        }}
      >

        <MedicoTable
          key={recargar}
          onEditar={editarMedico}
          onHorario={(m)=>console.log(m)}
          onEliminar={(m)=>console.log(m)}
        />

      </Paper>




      {/* FORMULARIO */}

      <Dialog
        open={open}
        maxWidth="md"
        fullWidth
        onClose={()=>setOpen(false)}
      >

        <DialogTitle
          sx={{
            background:"#1976d2",
            color:"white",
            fontWeight:"bold"
          }}
        >

          {
            medicoSeleccionado
            ? "Editar Médico"
            : "Registrar Médico"
          }

        </DialogTitle>


        <DialogContent
          sx={{
            mt:2
          }}
        >

          <MedicoForm
            medicoSeleccionado={medicoSeleccionado}
            onGuardar={guardarMedico}
            onCancelar={()=>setOpen(false)}
          />

        </DialogContent>


      </Dialog>



      {/* MENSAJE */}

      <Snackbar
        open={snackbar}
        autoHideDuration={3000}
        onClose={()=>setSnackbar(false)}
      >

        <Alert
          severity={tipoMensaje}
          variant="filled"
        >
          {mensaje}
        </Alert>

      </Snackbar>


    </Box>

  );

}