import { useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { TLead } from "../utils/backend";
import { FaPlus } from "react-icons/fa6";
import TabelaLeads from "../components/TabelaLeads";
import ModalLead from "../components/ModalLead";

import logo from "../assets/logo-white.svg";

export default function Leads() {
  // const leads: TLead[] = [
  //   {
  //     id: 1234,
  //     emailUsuario: "lucas@lucas.com",
  //     nome: "Lucas Lamonier",
  //     email: "teste1@teste.com",
  //     telefone: "62981814141",
  //     oportunidades: {
  //       todos: false,
  //       honoSucumbenciais: false,
  //       honoContra: true,
  //       honoDativos: true,
  //       creditoAutor: false,
  //     },
  //     status: "Dados Confirmados",
  //   },
  //   {
  //     id: 4321,
  //     emailUsuario: "lucas@lucas.com",
  //     nome: "Gustavo Melo",
  //     email: "teste2@teste.com",
  //     telefone: "62981814141",
  //     oportunidades: {
  //       todos: true,
  //       honoSucumbenciais: true,
  //       honoContra: true,
  //       honoDativos: true,
  //       creditoAutor: true,
  //     },
  //     status: "Cliente Potencial",
  //   },
  //   {
  //     id: 5555,
  //     emailUsuario: "lucas@lucas.com",
  //     nome: "Arthur Ribeiro",
  //     email: "teste3@teste.com",
  //     telefone: "6291919191",
  //     oportunidades: {
  //       todos: false,
  //       honoSucumbenciais: false,
  //       honoContra: false,
  //       honoDativos: false,
  //       creditoAutor: false,
  //     },
  //     status: "Análise do Lead",
  //   },
  // ];

  const loaderLeads = useLoaderData();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  // const [leads, setLeads] = useState<TLead[] | null>([]);
  const [leads, setLeads] = useState<TLead[] | null>([]);
  const usuarioLogado = useSelector((state: RootState) => state.logado);

  const modalRef = useRef<HTMLDialogElement | null>(null);

  const [leadAtivo, setLeadAtivo] = useState<TLead | null>(null);

  useEffect(() => {
    setLeads(loaderLeads as TLead[]);
  }, []);

  const mostrar = params.get("lead");

  useEffect(() => {
    const mostrar = params.get("lead");

    if (!modalRef.current || !leads) {
      return;
    }

    if (mostrar && mostrar === "novo") {
      setLeadAtivo(null);
      document.body.style.overflow = "hidden";
      modalRef.current.showModal();
      return;
    }

    if (mostrar && !isNaN(Number(mostrar))) {
      const leadAlvo = leads.find((l) => l.id === Number(mostrar));
      if (leadAlvo) {
        console.log("achou alvo");
        setLeadAtivo(leadAlvo);
      } else {
        console.log("não achou alvo");
        setLeadAtivo(null);
      }
      document.body.style.overflow = "hidden";
      modalRef.current.showModal();
      return;
    }

    document.body.style.overflow = "unset";
    modalRef.current.close();
  }, [mostrar]);

  const fecharModal = () => {
    setParams({});
  };

  const novoLead = () => {
    setParams({
      lead: "novo",
    });
  };

  return (
    <main>
      <dialog ref={modalRef}>
        <ModalLead
          leadAtivo={leadAtivo}
          fecharModal={fecharModal}
          emailUsuario={usuarioLogado.usuario?.email || ""}
          setLeads={setLeads}
        />
      </dialog>
      <section className="secao-lead">
        <div className="secao-container">
          <div className="img-margem">
            <img id="logo" src={logo} />
          </div>
          <div className="leads-container">
            <button
              className="botao-secundario botao-secundario-direita"
              onClick={novoLead}
            >
              <FaPlus /> Novo Lead
            </button>

            <TabelaLeads leads={leads} setLeads={setLeads} />
          </div>
          <div style={{ height: "5000px" }}></div>
        </div>
      </section>
    </main>
  );
}
