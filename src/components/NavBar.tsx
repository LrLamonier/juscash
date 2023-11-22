import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { logout } from "../store/slices/sliceUsuario";
import { fazerLogout } from "../utils/acessoLS";
import "./NavBar.css";

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

  const irParaLogin = () => {
    navigate("/?log=in");
  };

  return (
    <nav>
      <div>
        {usuarioLogado ? (
          <button onClick={desconectar}>Sair</button>
        ) : (
          <button onClick={irParaLogin}>Entrar</button>
        )}
      </div>
    </nav>
  );
}
