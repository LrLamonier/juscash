import { Oportunidades } from "./acessoLS";

export async function submeterLead(
  emailUsuario: string,
  nome: string,
  email: string,
  telefone: string,
  oportunidades: Oportunidades
) {
  if (!emailUsuario || !nome || !email || !telefone || !oportunidades) {
    return "Dados inválidos.";
  }
}
