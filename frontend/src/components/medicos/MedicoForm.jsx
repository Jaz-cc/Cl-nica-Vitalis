import { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Box,
  Paper,
  Typography,
  Divider
} from "@mui/material";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

import { obtenerEspecialidades } from "../../services/especialidadService";


const medicoInicial = {
  Nombre: "",
  ApellidoPaterno: "",
  ApellidoMaterno: "",
  Sexo: "",
  FechaNacimiento: "",
  Telefono: "",
  Correo: "",
  CedulaProfesional: "",
  IdEspecialidad: ""
};


export default function MedicoForm({
  medicoSeleccionado,
  onGuardar,
  onCancelar
}) {


  const [medico, setMedico] = useState(medicoInicial);
  const [especialidades, setEspecialidades] = useState([]);



  useEffect(() => {
    cargarEspecialidades();
  }, []);



  useEffect(() => {

    if (medicoSeleccionado) {
      setMedico(medicoSeleccionado);
    } else {
      setMedico(medicoInicial);
    }

  }, [medicoSeleccionado]);




  const cargarEspecialidades = async () => {

    try {

      const response = await obtenerEspecialidades();

      setEspecialidades(response.data);

    } catch(error){

      console.error(
        "Error al cargar especialidades:",
        error
      );

    }

  };




  const handleChange = (e)=>{

    setMedico({
      ...medico,
      [e.target.name]:e.target.value
    });

  };




  const handleSubmit=(e)=>{

    e.preventDefault();


    if(
      !medico.Nombre ||
      !medico.ApellidoPaterno ||
      !medico.CedulaProfesional ||
      !medico.Correo ||
      !medico.IdEspecialidad
    ){

      alert(
        "Complete los campos obligatorios."
      );

      return;

    }


    onGuardar(medico);

  };





  return (

    <Paper

      elevation={4}

      sx={{

        p:3,

        borderRadius:3,

        background:"#fafafa"

      }}

    >


      <Box
        display="flex"
        alignItems="center"
        gap={1}
        mb={2}
      >

        <PersonAddIcon
          color="primary"
          fontSize="large"
        />

        <Typography
          variant="h5"
          fontWeight="bold"
          color="primary"
        >

          {medicoSeleccionado
            ? "Editar Médico"
            : "Nuevo Médico"
          }

        </Typography>


      </Box>



      <Divider sx={{mb:3}} />

      <Box
        component="form"
        onSubmit={handleSubmit}
      >


        <Grid container spacing={3}>

          {/* Nombre */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Nombre"
              name="Nombre"
              value={medico.Nombre}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Apellido paterno */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Apellido Paterno"
              name="ApellidoPaterno"
              value={medico.ApellidoPaterno}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Apellido materno */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Apellido Materno"
              name="ApellidoMaterno"
              value={medico.ApellidoMaterno}
              onChange={handleChange}
            />
          </Grid>

          {/* Sexo */}
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="Sexo"
              name="Sexo"
              value={medico.Sexo}
              onChange={handleChange}
            >
              <MenuItem value="M">
                Masculino
              </MenuItem>

              <MenuItem value="F">
                Femenino
              </MenuItem>

            </TextField>
          </Grid>

          {/* Fecha */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              type="date"
              label="Fecha Nacimiento"
              name="FechaNacimiento"
              value={medico.FechaNacimiento}
              onChange={handleChange}
              InputLabelProps={{
                shrink:true
              }}
            />
          </Grid>

          {/* Teléfono */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Teléfono"
              name="Telefono"
              value={medico.Telefono}
              onChange={handleChange}
            />
          </Grid>

          {/* Correo */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Correo"
              name="Correo"
              type="email"
              value={medico.Correo}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Cedula */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Cédula Profesional"
              name="CedulaProfesional"
              value={medico.CedulaProfesional}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Especialidad */}
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Especialidad"
              name="IdEspecialidad"
              value={medico.IdEspecialidad}
              onChange={handleChange}
              required
            >

              {
                especialidades.map((especialidad)=>(
                  <MenuItem
                    key={especialidad.IdEspecialidad}
                    value={especialidad.IdEspecialidad}
                  >
                    {especialidad.Nombre}
                  </MenuItem>
                ))
              }

            </TextField>
          </Grid>

          {/* Botones */}
          <Grid item xs={12}>

            <Box
              display="flex"
              justifyContent="flex-end"
              gap={2}
              mt={2}
            >

              <Button
                variant="outlined"
                color="error"
                startIcon={<CancelIcon />}
                onClick={onCancelar}
                sx={{
                  px:4,
                  borderRadius:2
                }}
              >
                Cancelar
              </Button>


              <Button
                variant="contained"
                color="primary"
                type="submit"
                startIcon={<SaveIcon />}
                sx={{
                  px:5,
                  borderRadius:2
                }}
              >
                Guardar
              </Button>

            </Box>

          </Grid>

        </Grid>
      </Box>
    </Paper>
  );
}