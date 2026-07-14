import axios from "../api/axios";

export const obtenerHorarios = (idMedico) =>
    axios.get(`/horarios/medico/${idMedico}`);

export const registrarHorario = (datos) =>
    axios.post("/horarios", datos);

export const actualizarHorario = (id, datos) =>
    axios.put(`/horarios/${id}`, datos);

export const eliminarHorario = (id) =>
    axios.delete(`/horarios/${id}`);

export const cambiarEstadoHorario = (id, activo) =>
    axios.patch(`/horarios/${id}/estatus`, {
        activo
    });