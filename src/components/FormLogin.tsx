import { useRef, useState } from "react";
import { Link, SetURLSearchParams, useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import acessoLS from "../utils/acessoLS";

import logo from "../assets/logo-white.svg";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/sliceUsuario";

type Fn = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

export default function FormLogin({
  setSearch,
}: {
  setSearch: SetURLSearchParams;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const senhaRef = useRef<HTMLInputElement>(null);

  const erroEmail = useState<false | string>(false);
  const erroSenha = useState<false | string>(false);

  const [senhaVisivel, setSenhaVisivel] = useState(false);

  const irCriarConta = () => {
    setSearch({});
  };

  const resetarErro = (erro: Fn) => {
    if (!erro[0]) {
      return;
    }
    erro[1](false);
  };

  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    erroEmail[1](false);
    erroSenha[1](false);

    const email = emailRef.current?.value;
    const senha = senhaRef.current?.value;

    let erro;

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
      erroSenha[1]("Senha inválida.");
      if (!erro) {
        erro = senhaRef;
      }
    }

    if (erro) {
      erro.current?.focus();
      return;
    }

    let resposta;
    try {
      resposta = await acessoLS({
        email: email!,
        senha: senha!,
      });
    } catch {}

    if (!resposta) {
      console.log("Erro ao tentar fazer login.");
      return;
    }

    console.log(resposta);

    if (resposta.status === 404) {
      erroEmail[1]("Email não cadastrado.");
      if (emailRef.current && senhaRef.current) {
        emailRef.current.value = "";
        senhaRef.current.value = "";
      }
      emailRef.current?.focus();
      return;
    }

    if (resposta.status === 401) {
      erroSenha[1]("Senha incorreta.");
      if (senhaRef.current) {
        senhaRef.current.value = "";
      }
      senhaRef.current?.focus();
      return;
    }

    dispatch(login((resposta as any).usuario));

    navigate("/leads");
  };

  return (
    <section className="secao-form">
      <div className="secao-container">
        <img id="logo" src={logo} />

        <form onSubmit={submitLogin}>
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
              Senha: <span>* {erroSenha[0] ? erroSenha[0] : ""} </span>
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
                onChange={() => resetarErro(erroSenha as Fn)}
              />
              <button
                className="botao-senha"
                onClick={() => setSenhaVisivel((state) => !state)}
              >
                {senhaVisivel ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          <div className="link-conta">
            <button onClick={irCriarConta} type="button">
              Não possui conta? Criar conta.
            </button>
          </div>

          <button className="botao-confirma">Criar conta</button>
        </form>
      </div>
    </section>
  );
}
