import acessoLS, { TLead, atualizarStatus } from "../utils/backend";

type TResposta = { status: number; message: string; leadsAtualizados: TLead[] };

export default function ModalConfirma({
  nome = "",
  novo = 0,
  fechar,
  id,
  emailUsuario,
  setLeads,
}: {
  nome: string;
  novo: number;
  fechar: () => void;
  id: number;
  emailUsuario: string;
  setLeads: React.Dispatch<React.SetStateAction<TLead[] | null>>;
}) {
  const statusDisponiveis = [
    "Cliente Potencial",
    "Dados Confirmados",
    "Análise do Lead",
  ];

  const confirmarMudanca = async () => {
    let atualizar;
    try {
      atualizar = await atualizarStatus(emailUsuario, id);
    } catch {}

    if (!atualizar) {
      console.log("nuatualizou");
      fechar();
      return;
    }
    setLeads(atualizar as TLead[]);
    fechar();
  };

  return (
    <div style={{ width: "20rem", zIndex: 10 }}>
      <p style={{ lineHeight: 1.6, fontWeight: 400 }}>
        Mudar o status do lead{" "}
        <span style={{ color: "#2798ba", fontWeight: 700 }}>{nome}</span> de{" "}
        <span style={{ color: "#2798ba", fontWeight: 700 }}>
          {statusDisponiveis[novo - 1]}
        </span>{" "}
        para{" "}
        <span style={{ color: "#2798ba", fontWeight: 700 }}>
          {statusDisponiveis[novo]}
        </span>
        ?
      </p>
      <div
        style={{
          display: "flex",
          width: "100%",
          gap: "15px",
          justifyContent: "center",
        }}
      >
        <button
          onClick={fechar}
          className="botao-secundario"
          style={{
            backgroundColor: "transparent",
            border: "1px solid #888888",
            color: "#888888",
          }}
        >
          Cancelar
        </button>
        <button className="botao-secundario" onClick={confirmarMudanca}>
          Confirmar
        </button>
      </div>
    </div>
  );
}
