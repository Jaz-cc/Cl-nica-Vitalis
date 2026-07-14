import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Medicos from "./pages/Medicos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/iniciar-sesion" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/medicos" element={<Medicos />} />
    </Routes>
  );
}

export default App;