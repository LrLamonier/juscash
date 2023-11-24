import { useRef, useState } from "react";
import { SetURLSearchParams, useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import acessoLS from "../utils/acessoLS";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

import logo from "../assets/logo-white.svg";

type Fn = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

export default function FormSignUp({
  setSearch,
}: {
  setSearch: SetURLSearchParams;
}) {
  const navigate = useNavigate();

  const nomeRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const senhaRef = useRef<HTMLInputElement>(null);
  const confirmaRef = useRef<HTMLInputElement>(null);

  const erroNome = useState(false);
  const erroEmail = useState<false | string>(false);
  const erroSenha = useState(false);
  const erroConfirm = useState(false);

  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmVisivel, setConfirmVisivel] = useState(false);

  const irLogin = () => {
    setSearch({ log: "in" });
  };

  const resetarErro = (erro: Fn) => {
    if (!erro[0]) {
      return;
    }
    erro[1](false);
  };

  const submitCriarConta = async (e: React.FormEvent) => {
    e.preventDefault();

    erroNome[1](false);
    erroEmail[1](false);
    erroSenha[1](false);
    erroConfirm[1](false);

    const nome = nomeRef.current?.value;
    const email = emailRef.current?.value;
    const senha = senhaRef.current?.value;
    const confirma = confirmaRef.current?.value;

    let erro;

    if (!nome || nome.length > 30) {
      erroNome[1](true);
      erro = nomeRef;
    }

    if (!email || !isEmail(email)) {
      erroEmail[1]("Email inválido.");
      if (!erro) {
        erro = emailRef;
      }
    }

    const letras = /[a-z]/i;
    const numeros = /[0-9]/;
    const simbolos = /[-#!$@£%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;

    if (
      !senha ||
      !letras.test(senha) ||
      !numeros.test(senha) ||
      !simbolos.test(senha)
    ) {
      erroSenha[1](true);
      erroConfirm[1](true);
      if (!erro) {
        erro = senhaRef;
      }
    }

    if (!confirma || confirma !== senha) {
      erroConfirm[1](true);
      if (!erro) {
        erro = confirmaRef;
      }
    }

    if (erro) {
      erro.current?.focus();
      return;
    }

    let resposta;
    try {
      resposta = await acessoLS({
        nome: nome!,
        email: email!,
        senha: senha!,
      });
    } catch {}

    if (!resposta) {
      console.log("Erro ao tentar criar nova conta.");
      return;
    }

    console.log(resposta);

    if ((resposta as { status: number }).status === 400) {
      erroEmail[1]("Email já cadastrado.");
      if (emailRef.current) {
        emailRef.current.value = "";
      }
      emailRef.current?.focus();
      return;
    }

    navigate("/leads");
  };

  return (
    <section className="secao-form">
      <div className="secao-container">
        <img id="logo" src={logo} />

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
              onChange={() => resetarErro(erroNome)}
            />
          </div>
          <div className="grupo-input">
            <label htmlFor="criarEmail">
              Email: <span>* {!erroEmail[0] ? "" : erroEmail[0]} </span>
            </label>
            <input
              ref={emailRef}
              type="text"
              id="criarEmail"
              name="criar-email"
              minLength={4}
              maxLength={30}
              className={erroEmail[0] ? "erro-input" : ""}
              onChange={() => resetarErro(erroEmail as Fn)}
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
                onChange={() => resetarErro(erroSenha)}
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
                onChange={() => resetarErro(erroConfirm)}
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
            <button onClick={irLogin} type="button">
              Já possui uma conta? Fazer o login
            </button>
          </div>

          <button className="botao-confirma">Criar conta</button>
        </form>
      </div>
    </section>
  );
}
