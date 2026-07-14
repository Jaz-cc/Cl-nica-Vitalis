import axios from "../api/axios";

export const obtenerMedicos = () =>
    axios.get("/medicos");

export const obtenerMedico = (id) =>
    axios.get(`/medicos/${id}`);

export const registrarMedico = (data) =>
    axios.post("/medicos", data);

export const actualizarMedico = (id, data) =>
    axios.put(`/medicos/${id}`, data);

export const cambiarEstado = (id, estatus) =>
    axios.patch(`/medicos/${id}/estatus`, {
        estatus
    });

export const eliminarMedico = (id) =>
    axios.delete(`/medicos/${id}`);

export const buscarMedicos = (texto) =>
    axios.get(`/medicos/buscar?texto=${texto}`);