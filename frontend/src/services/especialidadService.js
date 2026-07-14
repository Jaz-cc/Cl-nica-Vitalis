import axios from "../api/axios";

export const obtenerEspecialidades = () =>
    axios.get("/especialidades");