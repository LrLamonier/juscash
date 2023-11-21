import { Link } from "react-router-dom";

import logo from "../assets/logo-white.svg";

import "./Home.css";
import { useState } from "react";

export default function Home() {
  const submitCriarConta = (dados: React.FormEvent) => {};

  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmVisivel, setConfirmVisivel] = useState(false);

  return (
    <main>
      <section className="secao-form">
        <div className="secao-container">
          {/* logo */}
          <img id="logo" src={logo} />

          {/* form */}
          <form onSubmit={(dados) => submitCriarConta(dados)}>
            <div className="grupo-input">
              <label htmlFor="criar-nome">
                Seu nome completo: <span>*</span>
              </label>
              <input
                type="text"
                id="criar-nome"
                name="criar-nome"
                minLength={4}
                maxLength={30}
              />
            </div>
            <div className="grupo-input">
              <label htmlFor="criar-email">
                Email: <span>*</span>
              </label>
              <input
                type="text"
                id="criar-email"
                name="criar-email"
                minLength={4}
                maxLength={30}
              />
            </div>
            <div className="grupo-input">
              <label htmlFor="criar-senha">
                Senha: <span>*</span>
              </label>
              <input
                type={senhaVisivel ? "text" : "password"}
                id="criar-senha"
                name="criar-senha"
                minLength={4}
                maxLength={30}
              />
            </div>
            <div className="grupo-input">
              <label htmlFor="criar-confirma-senha">
                Confirme sua senha: <span>*</span>
              </label>
              <input
                type={confirmVisivel ? "text" : "password"}
                id="criar-confirma-senha"
                name="criar-confirma-senha"
                minLength={4}
                maxLength={30}
              />
            </div>

            <div className="link-conta">
              <Link to="/criar-conta">Já possui uma conta? Fazer o login</Link>
            </div>

            <button className="botao-confirma">Criar conta</button>
          </form>
        </div>
      </section>
    </main>
  );
}
