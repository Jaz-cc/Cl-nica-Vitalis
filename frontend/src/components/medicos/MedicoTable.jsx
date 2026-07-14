import { useEffect, useState } from "react";

import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    IconButton,
    Chip
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import ScheduleIcon from "@mui/icons-material/Schedule";
import DeleteIcon from "@mui/icons-material/Delete";
import { obtenerMedicos, buscarMedicos } from "../../services/medicoService";

export default function MedicoTable({

    onEditar,
    onHorario,
    onEliminar

}) {

    const [medicos, setMedicos] = useState([]);

    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {

        cargarMedicos();

    }, []);

    const cargarMedicos = async () => {

        try {

            const response = await obtenerMedicos();

            setMedicos(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const buscar = async (texto) => {

        setBusqueda(texto);

        if (texto === "") {

            cargarMedicos();

            return;

        }

        try {

            const response = await buscarMedicos(texto);

            setMedicos(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <>

            <TextField

                fullWidth

                label="Buscar médico"

                margin="normal"

                value={busqueda}

                onChange={(e) => buscar(e.target.value)}

            />

            <TableContainer component={Paper}>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>Nombre</TableCell>

                            <TableCell>Especialidad</TableCell>

                            <TableCell>Teléfono</TableCell>

                            <TableCell>Correo</TableCell>

                            <TableCell>Estado</TableCell>

                            <TableCell align="center">

                                Acciones

                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {

                            medicos.map((medico) => (

                                <TableRow
                                    key={medico.IdMedico}
                                >

                                    <TableCell>

                                        {medico.Nombre}{" "}

                                        {medico.ApellidoPaterno}{" "}

                                        {medico.ApellidoMaterno}

                                    </TableCell>

                                    <TableCell>

                                        {medico.Especialidad}

                                    </TableCell>

                                    <TableCell>

                                        {medico.Telefono}

                                    </TableCell>

                                    <TableCell>

                                        {medico.Correo}

                                    </TableCell>

                                    <TableCell>

                                        {

                                            medico.Estatus ?

                                                <Chip

                                                    label="Activo"

                                                    color="success"

                                                />

                                                :

                                                <Chip

                                                    label="Inactivo"

                                                    color="error"

                                                />

                                        }

                                    </TableCell>

                                    <TableCell align="center">

                                        <IconButton

                                            color="primary"

                                            onClick={() =>

                                                onEditar(medico)

                                            }

                                        >

                                            <EditIcon/>

                                        </IconButton>

                                        <IconButton

                                            color="secondary"

                                            onClick={() =>

                                                onHorario(medico)

                                            }

                                        >

                                            <ScheduleIcon/>

                                        </IconButton>

                                        <IconButton

                                            color="error"

                                            onClick={() =>

                                                onEliminar(medico)

                                            }

                                        >

                                            <DeleteIcon/>

                                        </IconButton>

                                    </TableCell>

                                </TableRow>

                            ))

                        }

                    </TableBody>

                </Table>

            </TableContainer>

        </>

    );

}