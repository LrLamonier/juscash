import { useRef, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import acessoLS, { DadosLead, Oportunidades, TLead } from "../utils/backend";

type Fn = [boolean, React.Dispatch<React.SetStateAction<boolean>>];
type TResposta = { status: number; leadsAtualizados: TLead[] };

export default function ModalLead({
  leadAtivo,
  fecharModal,
  emailUsuario,
  setLeads,
}: {
  leadAtivo: TLead | null;
  fecharModal: () => void;
  emailUsuario: string;
  setLeads: React.Dispatch<React.SetStateAction<TLead[] | null>>;
}) {
  const [params] = useSearchParams();
  useEffect(() => {
    erroNome[1](false);
    erroEmail[1](false);
    erroTelefone[1](false);

    let oportunidades: Oportunidades = {
      todos: true,
      honoSucumbenciais: true,
      honoContra: true,
      honoDativos: true,
      creditoAutor: true,
    };

    if (leadAtivo) {
      oportunidades = { ...leadAtivo.oportunidades };
    }

    if (
      todosRef.current &&
      hoSucumRef.current &&
      hoContraRef.current &&
      hoDativosRef.current &&
      credRef.current
    ) {
      todosRef.current.checked = oportunidades.todos;
      hoSucumRef.current.checked = oportunidades.honoSucumbenciais;
      hoContraRef.current.checked = oportunidades.honoContra;
      hoDativosRef.current.checked = oportunidades.honoDativos;
      credRef.current.checked = oportunidades.creditoAutor;
    }

    if (
      leadAtivo &&
      nomeRef.current &&
      emailRef.current &&
      telefoneRef.current
    ) {
      nomeRef.current.value = leadAtivo.nome;
      emailRef.current.value = leadAtivo.email;
      telefoneRef.current.value = leadAtivo.telefone;
    }

    return () => {
      erroNome[1](false);
      erroEmail[1](false);
      erroTelefone[1](false);
    };
  }, [params, leadAtivo]);

  const disabled = !!leadAtivo;

  const nomeRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const telefoneRef = useRef<HTMLInputElement>(null);
  const todosRef = useRef<HTMLInputElement>(null);
  const hoSucumRef = useRef<HTMLInputElement>(null);
  const hoContraRef = useRef<HTMLInputElement>(null);
  const hoDativosRef = useRef<HTMLInputElement>(null);
  const credRef = useRef<HTMLInputElement>(null);

  const erroNome = useState(false);
  const erroEmail = useState(false);
  const erroTelefone = useState(false);

  const telefoneOnChange = (e: React.BaseSyntheticEvent) => {
    if (!telefoneRef.current) {
      return;
    }

    erroTelefone[1](false);

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

  const checkOnChange = (e: React.BaseSyntheticEvent) => {
    if (
      !todosRef.current ||
      !hoSucumRef.current ||
      !hoContraRef.current ||
      !hoDativosRef.current ||
      !credRef.current
    ) {
      return;
    }

    const todosCheck: boolean = todosRef.current.checked;
    const checks: boolean[] = [
      hoSucumRef.current.checked,
      hoContraRef.current.checked,
      hoDativosRef.current.checked,
      credRef.current.checked,
    ];

    if (e.target.value !== "todos") {
      if (checks.findIndex((c) => c === false) === -1) {
        todosRef.current.checked = true;
      } else if (todosCheck) {
        todosRef.current.checked = false;
      }
      return;
    }

    if (checks.findIndex((c) => c === false) !== -1) {
      hoSucumRef.current.checked = true;
      hoContraRef.current.checked = true;
      hoDativosRef.current.checked = true;
      credRef.current.checked = true;
    } else {
      hoSucumRef.current.checked = false;
      hoContraRef.current.checked = false;
      hoDativosRef.current.checked = false;
      credRef.current.checked = false;
    }
  };

  const resetarErro = (erro: Fn) => {
    if (!erro[0]) {
      return;
    }
    erro[1](false);
  };

  async function submitSalvarLead(e: React.FormEvent) {
    e.preventDefault();

    erroNome[1](false);
    erroEmail[1](false);
    erroTelefone[1](false);

    const nome = nomeRef.current?.value;
    const email = emailRef.current?.value;
    const telefone = telefoneRef.current?.value.replace(/\D/g, "");
    const oportunidades = {
      todos: todosRef.current?.checked,
      honoSucumbenciais: hoSucumRef.current?.checked,
      honoContra: hoContraRef.current?.checked,
      honoDativos: hoDativosRef.current?.checked,
      creditoAutor: credRef.current?.checked,
    };

    let erro;

    if (!nome || nome.length > 30) {
      erroNome[1](true);
      erro = nomeRef;
    }

    if (!email || !isEmail(email)) {
      erroEmail[1](true);
      if (!erro) {
        erro = emailRef;
      }
    }

    if (
      !telefone ||
      /\D/.test(telefone) ||
      telefone.length < 10 ||
      telefone.length > 11
    ) {
      erroTelefone[1](true);
      if (!erro) {
        erro = telefoneRef;
      }
    }

    if (erro) {
      erro.current?.focus();
      return;
    }

    let resposta;

    try {
      resposta = await acessoLS({
        emailUsuario,
        nome: nome!,
        email: email!,
        telefone: telefone!,
        oportunidades: oportunidades as Oportunidades,
      } as DadosLead);
    } catch {}

    if (!resposta) {
      console.log("Erro ao tentar registrar nova Lead.");
      return;
    }

    setLeads((resposta as TResposta).leadsAtualizados);
    fecharModal();
  }

  return (
    <section
      style={{
        margin: "0 auto",
        width: "20rem",
        color: "#ffffff",
        fontWeight: 500,
        zIndex: 10,
      }}
    >
      <div className="secao-container">
        <form onSubmit={submitSalvarLead}>
          <h1>Novo Lead</h1>

          <h2>Dados do Lead</h2>

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
              disabled={disabled}
              style={{ backgroundColor: disabled ? "#dddddd" : "" }}
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
              disabled={disabled}
              style={{ backgroundColor: disabled ? "#dddddd" : "" }}
            />
          </div>

          <div className="grupo-input">
            <label htmlFor="telefoneLead">
              Telefone:{" "}
              <span>* {erroTelefone[0] ? "Telefone inválido." : ""}</span>
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
              disabled={disabled}
              style={{ backgroundColor: disabled ? "#dddddd" : "" }}
            />
          </div>

          <h2>Oportunidades</h2>

          <div className="grupo-input grupo-oportunidades">
            <input
              ref={todosRef}
              type="checkbox"
              value="todos"
              id="sucumbenciaisLead"
              name="sucumbenciais-lead"
              onChange={checkOnChange}
              disabled={disabled}
            />
            <label htmlFor="sucumbenciaisLead">Todos</label>
          </div>

          <div className="grupo-input grupo-oportunidades">
            <input
              ref={hoSucumRef}
              type="checkbox"
              value="sucumbenciais"
              id="dativosLead"
              name="contratuais-lead"
              minLength={4}
              maxLength={30}
              onChange={checkOnChange}
              disabled={disabled}
            />
            <label htmlFor="oportunidadesLead">Honorários Contratuais</label>
          </div>

          <div className="grupo-input grupo-oportunidades">
            <input
              ref={hoContraRef}
              type="checkbox"
              value="contratuais"
              id="contratuaisLead"
              name="contratuais-lead"
              minLength={4}
              maxLength={30}
              onChange={checkOnChange}
              disabled={disabled}
            />
            <label htmlFor="contratuaisLead">Honorários Contratuais</label>
          </div>

          <div className="grupo-input grupo-oportunidades">
            <input
              ref={hoDativosRef}
              type="checkbox"
              value="dativos"
              id="dativosLead"
              name="dativos-lead"
              minLength={4}
              maxLength={30}
              onChange={checkOnChange}
              disabled={disabled}
            />
            <label htmlFor="dativosLead">Honorários Dativos</label>
          </div>

          <div className="grupo-input grupo-oportunidades">
            <input
              ref={credRef}
              type="checkbox"
              value="credito"
              id="creditoLead"
              name="credito-lead"
              minLength={4}
              maxLength={30}
              onChange={checkOnChange}
              disabled={disabled}
            />
            <label htmlFor="creditoLead">Crédito do Autor</label>
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              gap: "15px",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={fecharModal}
              className="botao-secundario"
              style={{
                backgroundColor: "transparent",
                border: "1px solid #888888",
                color: "#888888",
              }}
              type="button"
            >
              Cancelar
            </button>

            <button
              className="botao-secundario"
              style={{
                backgroundColor: !!leadAtivo ? "#aaaaaa" : "",
                cursor: disabled ? "not-allowed" : "pointer",
              }}
              disabled={!!leadAtivo}
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
