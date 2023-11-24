import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TLead } from "../utils/acessoLS";
import { MdOutlineDragIndicator } from "react-icons/md";

export default function TabelaLeads({ leads }: { leads: TLead[] | null }) {
  return (
    <div className="tabela-leads">
      <div className="leads-linha">
        <div className="leads-slot leads-header">Cliente Potencial</div>
        <div className="leads-slot leads-header">
          <h1>Dados Confirmados</h1>
        </div>
        <div className="leads-slot leads-header">
          <h1>Análise do Lead</h1>
        </div>
      </div>
      <DndProvider backend={HTML5Backend}>
        {!leads ? (
          <div
            className={`leads-linha`}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p style={{ textAlign: "center" }}>
              Não foi possível obter os leads.
              <br />
              Tente novamente mais tarde.
            </p>
          </div>
        ) : leads.length === 0 ? (
          <div
            className={`leads-linha`}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p style={{ textAlign: "center" }}>
              Nenhum lead encontrado
              <br />
              para este usuário.
            </p>
          </div>
        ) : (
          leads.map((l, i) => {
            return (
              <LinhaLead
                key={"l-lead-" + i}
                idx={i}
                nome={l.nome}
                id={l.id}
                status={l.status}
              />
            );
          })
        )}
      </DndProvider>
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
  const statusDisponiveis = [
    "Cliente Potencial",
    "Dados Confirmados",
    "Análise do Lead",
  ];
  const statusNum = statusDisponiveis.findIndex((s) => s === status);

  const [num, setNum] = useState(statusNum);

  return (
    <div
      className={`leads-linha ${
        idx % 2 === 0 ? "leads-linha-conteudo-impar" : ""
      }`}
    >
      <LeadSlot id={id} num={0} setNum={setNum}>
        {num === 0 ? <Lead id={id} status={num} nome={nome} /> : null}
      </LeadSlot>
      <LeadSlot id={id} num={1} setNum={setNum}>
        {num === 1 ? <Lead id={id} status={num} nome={nome} /> : null}
      </LeadSlot>
      <LeadSlot id={id} num={2} setNum={setNum}>
        {num === 2 ? <Lead id={id} status={num} nome={nome} /> : null}
      </LeadSlot>
    </div>
  );
}

function LeadSlot({
  style,
  children,
  setNum,
  num,
  id,
}: {
  style?: React.CSSProperties;
  children?: React.ReactNode;
  setNum: React.Dispatch<React.SetStateAction<number>>;
  num: number;
  id: number;
}) {
  let accept: string | string[];
  if (num === 0) {
    accept = "nope";
  } else if (num === 1) {
    accept = "lead-id-" + id + "-status-0";
  } else {
    accept = "lead-id-" + id + "-status-1";
  }

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept,
      drop: () => {
        setNum(num);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    []
  );

  let backgroundColor = "";
  if (canDrop && isOver) {
    backgroundColor = "#2cbd62";
  } else if (canDrop) {
    backgroundColor = "#2798ba";
  }

  return (
    <div
      ref={drop}
      className="leads-slot"
      style={{
        backgroundColor,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Lead({
  id,
  nome,
  status,
}: {
  id: number;
  nome: string;
  status: number;
}) {
  const [, setParams] = useSearchParams();
  const abrirModal = () => {
    setParams({
      lead: String(id),
    });
  };

  const [, drag, preview] = useDrag(
    () => ({
      type: "lead-id-" + id + "-status-" + status,
    }),
    []
  );

  const [called, setCalled] = useState(false);
  useEffect(() => {
    if (!called) {
      setCalled(true);
    }
  }, []);

  if (!called) {
    return null;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: 1,
      }}
    >
      <div
        ref={preview}
        style={{
          width: "97%",
          height: "90%",
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
          borderRadius: "5px",
          border: "1px solid #444444",
          cursor: "pointer",
        }}
      >
        <p
          style={{
            backgroundColor: "transparent",
            border: "none",
            height: "100%",
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={abrirModal}
        >
          {nome}
        </p>
        <div
          ref={drag}
          style={{
            cursor: "grab",
            border: "none",
            height: "100%",
            width: "17%",
            flexGrow: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderLeft: "1px solid #bbbbbb",
          }}
        >
          <MdOutlineDragIndicator style={{ pointerEvents: "none" }} />
        </div>
      </div>
    </div>
  );
}
