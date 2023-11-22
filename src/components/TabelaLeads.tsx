import { DndContext } from "@dnd-kit/core";
import { useSearchParams } from "react-router-dom";
import { Lead } from "../utils/acessoLS";

export default function TabelaLeads({ leads }: { leads: Lead[] | null }) {
  //   const leads: LeadLista[] = [
  //     { nome: "Lucas Ramos Lamonier", id: 1234 },
  //     { nome: "Gustavo Cândido de Oliveira Melo", id: 1221 },
  //   ];

  return (
    <div className="tabela-leads">
      <DndContext>
        <div className="leads-linha">
          <div className="leads-slot leads-header">Cliente Potencial</div>
          <div className="leads-slot leads-header">
            <h1>Dados Confirmados</h1>
          </div>
          <div className="leads-slot leads-header">
            <h1>Análise do Lead</h1>
          </div>
        </div>
        {!leads
          ? "não foi possível acessar os leads"
          : leads.length === 0
          ? "nenhum lead encontrado"
          : leads.map((lead, i) => (
              <LinhaLead
                key={"lead-" + i}
                idx={i}
                nome={lead.nome}
                id={lead.id}
                status={lead.status}
              />
            ))}
      </DndContext>
    </div>
  );
}

function LinhaLead({
  idx,
  nome,
  id,
  status,
}: {
  idx: number;
  nome: string;
  id: number;
  status: "Cliente Potencial" | "Dados Confirmados" | "Análise do Lead";
}) {
  const [params, setParams] = useSearchParams();

  const nomeDisplay = nome.length < 36 ? nome : nome.slice(0, 36);

  const statusDisponiveis = [
    "Cliente Potencial",
    "Dados Confirmados",
    "Análise do Lead",
  ];
  const statusNum = statusDisponiveis.findIndex((s) => s === status);

  return (
    <div
      className={`leads-linha ${idx % 2 === 0 ? "leads-linha-conteudo" : ""}`}
    >
      {statusDisponiveis.map((_, i) => {
        return (
          <div key={id + "-" + i} className="leads-slot">
            {i === statusNum ? <button>{nome}</button> : ""}
          </div>
        );
      })}
    </div>
  );
}
