import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { logout } from "../store/slices/sliceUsuario";
import { fazerLogout } from "../utils/acessoLS";
import "./NavBar.css";

import logo from "../assets/logo-white.svg";

export default function NavBar() {
  const usuarioLogado = useSelector((state: RootState) => state.logado);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const desconectar = async () => {
    try {
      await fazerLogout();
    } catch {}
    dispatch(logout);
    navigate("/");
  };

  return (
    <nav>
      <div>
        {usuarioLogado ? (
          <button onClick={desconectar}>Sair</button>
        ) : (
          <button onClick={() => navigate("/login")}>Entrar</button>
        )}
      </div>
    </nav>
  );
}
