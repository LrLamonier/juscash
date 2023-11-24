import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/sliceUsuario";
import acessoLS from "../utils/backend";
import FormLogin from "../components/FormLogin";
import FormSignUp from "../components/FormSignUp";

export default function Home() {
  const [search, setSearch] = useSearchParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const semLogin = async () => {
    const res = await acessoLS({
      email: "lucas@lucas.com",
      senha: "asdf1234$",
    });
    dispatch(login((res as any).usuario));
    navigate("/leads");
  };

  return (
    <main>
      {search.get("log") ? (
        <FormLogin setSearch={setSearch} />
      ) : (
        <FormSignUp setSearch={setSearch} />
      )}
      <button onClick={semLogin}>Acessar sem login.</button>
    </main>
  );
}
