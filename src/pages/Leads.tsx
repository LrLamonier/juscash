import "./Home.css";
import logo from "../assets/logo-white.svg";
import { useNavigate } from "react-router-dom";

export default function Leads() {
  const navigate = useNavigate();

  // const nomeRef = useRef<HTMLInputElement>(null);

  // const erroEmail = useState<false | string>(false);

  return (
    <main>
      <section className="secao-form">
        <div className="secao-container">
          <img id="logo" src={logo} />

          <form>
            <div className="grupo-input">
              <label htmlFor="criarNome">
                Seu nome completo:{" "}
                <span>* erroNome[0] ? "Nome inválido." : ""</span>
              </label>
              <input
                //   ref={nomeRef}
                type="text"
                id="criarNome"
                name="criar-nome"
                minLength={4}
                maxLength={30}
                //   className={erroNome[0] ? "erro-input" : ""}
                //   onChange={() => resetarErro(erroNome)}
              />
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
