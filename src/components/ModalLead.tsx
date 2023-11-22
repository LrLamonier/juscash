import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import acessoLS from "../utils/acessoLS";

import logo from "../assets/logo-white.svg";

type Fn = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

export default function ModalLead() {
  const nomeRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const telefoneRef = useRef<HTMLInputElement>(null);

  const erroNome = useState(false);
  const erroEmail = useState(false);
  const erroTelefone = useState(false);

  const telefoneOnChange = (e: React.BaseSyntheticEvent) => {
    if (!telefoneRef.current) {
      return;
    }

    const numero = e.target.value.replace(/\D/g, "");

    let novoNumero = "";

    if (numero.length >= 11) {
      novoNumero =
        "(" +
        numero.slice(0, 2) +
        ") " +
        numero.slice(2, 7) +
        " - " +
        numero.slice(7, 11);
      e.target.value = novoNumero;
      return;
    }

    if (numero.length === 10) {
      console.log("dez");
      novoNumero =
        "(" +
        numero.slice(0, 2) +
        ") " +
        numero.slice(2, 6) +
        " - " +
        numero.slice(6, 10);
      e.target.value = novoNumero;
      return;
    }

    if (numero.length >= 6) {
      novoNumero =
        "(" +
        numero.slice(0, 2) +
        ") " +
        numero.slice(2, 6) +
        " - " +
        numero.slice(6);
      e.target.value = novoNumero;
      return;
    }

    if (numero.length > 2) {
      novoNumero = "(" + numero.slice(0, 2) + ") " + numero.slice(2);
      e.target.value = novoNumero;
      return;
    }

    if (numero.length === 0) {
      e.target.value = "";
      e.target.value = novoNumero;
      return;
    }
  };

  const resetarErro = (erro: Fn) => {
    if (!erro[0]) {
      return;
    }
    erro[1](false);
  };

  const submitCriarConta = async (e: React.FormEvent) => {};

  return (
    <main>
      <section className="secao-form">
        <div className="secao-container">
          <img id="logo" src={logo} />

          <form onSubmit={submitCriarConta}>
            <div className="grupo-input">
              <label htmlFor="nome-lead">
                Nome completo:{" "}
                <span>* {erroNome[0] ? "Nome inválido." : ""}</span>
              </label>
              <input
                ref={nomeRef}
                type="text"
                id="nome-lead"
                name="criar-nome"
                minLength={4}
                maxLength={30}
                className={erroNome[0] ? "erro-input" : ""}
                onChange={() => resetarErro(erroNome)}
              />
            </div>

            <div className="grupo-input">
              <label htmlFor="telefoneLead">
                Email: <span>* {erroEmail[0] ? "Email inválido." : ""}</span>
              </label>
              <input
                ref={emailRef}
                type="text"
                id="emailLead"
                name="email-lead"
                minLength={4}
                maxLength={30}
                className={erroEmail[0] ? "erro-input" : ""}
                onChange={() => resetarErro(erroEmail)}
              />
            </div>

            <div className="grupo-input">
              <label htmlFor="telefoneLead">
                Telefone:{" "}
                <span>* {erroTelefone[0] ? "Email inválido." : ""}</span>
              </label>
              <input
                ref={telefoneRef}
                type="text"
                id="telefoneLead"
                name="telefone-lead"
                minLength={4}
                maxLength={30}
                className={erroTelefone[0] ? "erro-input" : ""}
                onChange={telefoneOnChange}
              />
            </div>

            <button className="botao-confirma">Criar conta</button>
          </form>
        </div>
      </section>
    </main>
  );
}
