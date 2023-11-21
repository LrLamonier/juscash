import { useSelector } from "react-redux";
import "./NavBar.css";
import { RootState } from "../store/store";
import acessoLS from "../utils/acessoLS";

export default function NavBar() {
  const usuarioLogado = useSelector((state: RootState) => state.logado);

  // const logout = acessoLS("logado");

  return (
    <nav>{usuarioLogado ? <button>Sair</button> : <button>Entrar</button>}</nav>
  );
}
