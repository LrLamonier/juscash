import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

import logo from "../assets/logo-white.svg";

import "./Home.css";

type Fn = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

export default function Home() {
  const nomeRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const senhaRef = useRef<HTMLInputElement>(null);
  const confirmaRef = useRef<HTMLInputElement>(null);

  const erroNome = useState(false);
  const erroEmail = useState(false);
  const erroSenha = useState(false);
  const erroConfirm = useState(false);

  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmVisivel, setConfirmVisivel] = useState(false);

  const resetarCampo = (erro: Fn) => {
    console.log(erro[0]);
    if (!erro[0]) {
      return;
    }
    erro[1](false);
  };

  const submitCriarConta = (e: React.FormEvent) => {
    e.preventDefault();

    // const [nome, email, senha, confirma] = (dados.target)
  };

  return (
    <main>
      <section className="secao-form">
        <div className="secao-container">
          {/* logo */}
          <img id="logo" src={logo} />

          {/* form */}
          <form onSubmit={submitCriarConta}>
            <div className="grupo-input">
              <label htmlFor="criarNome">
                Seu nome completo:{" "}
                <span>* {erroNome[0] ? "Nome inválido." : ""}</span>
              </label>
              <input
                ref={nomeRef}
                type="text"
                id="criarNome"
                name="criar-nome"
                minLength={4}
                maxLength={30}
                className={erroNome[0] ? "erro-input" : ""}
                onChange={() => resetarCampo(erroNome)}
              />
            </div>
            <div className="grupo-input">
              <label htmlFor="criarEmail">
                Email: <span>* {erroEmail[0] ? "Email inválido." : ""} </span>
              </label>
              <input
                ref={emailRef}
                type="text"
                id="criarEmail"
                name="criar-email"
                minLength={4}
                maxLength={30}
                className={erroEmail[0] ? "erro-input" : ""}
                onChange={() => resetarCampo(erroEmail)}
              />
            </div>
            <div className="grupo-input">
              <label htmlFor="criarSenha">
                Senha: <span>* {erroSenha[0] ? "Senha inválida." : ""} </span>
              </label>
              <div className="senha-container">
                <input
                  ref={senhaRef}
                  type={senhaVisivel ? "text" : "password"}
                  id="criarSenha"
                  name="criarSenha"
                  minLength={4}
                  maxLength={30}
                  className={erroSenha[0] ? "erro-input" : ""}
                  onChange={() => resetarCampo(erroSenha)}
                />
                <button
                  className="botao-senha"
                  onClick={() => setSenhaVisivel((state) => !state)}
                >
                  {senhaVisivel ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              <p className="p-senha">
                A senha deve ter no mínimo 8 caracteres, contendo ao menos um
                caracter especial, um número e uma letra.
              </p>
            </div>
            <div className="grupo-input">
              <label htmlFor="criarConfirmaSenha">
                Confirme sua senha:{" "}
                <span>
                  * <span>{erroConfirm[0] ? "Senhas não conferem." : ""} </span>
                </span>
              </label>
              <div className="senha-container">
                <input
                  ref={confirmaRef}
                  type={confirmVisivel ? "text" : "password"}
                  id="criarConfirmaSenha"
                  name="criarConfirmaSenha"
                  minLength={4}
                  maxLength={30}
                  className={erroConfirm[0] ? "erro-input" : ""}
                  onChange={() => resetarCampo(erroConfirm)}
                />
                <button
                  className="botao-senha"
                  onClick={() => setConfirmVisivel((state) => !state)}
                >
                  {confirmVisivel ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
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
