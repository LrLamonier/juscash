export type Oportunidades = {
  todos: boolean;
  honoSucumbenciais: boolean;
  honoContra: boolean;
  honoDativos: boolean;
  creditoAutor: boolean;
};

export interface DadosLead {
  emailUsuario: string;
  nome: string;
  email: string;
  telefone: string;
  oportunidades: Oportunidades;
}

export interface TLead extends DadosLead {
  id: number;
  status: "Cliente Potencial" | "Dados Confirmados" | "Análise do Lead";
}

export interface Login {
  email: string;
  senha: string;
}

export interface Usuario extends Login {
  nome: string;
}

export type Consulta = {
  emailAutor: string;
  id?: number;
};

function getLocal<T>(chave: string): T[] {
  const local = localStorage.getItem(chave);
  let arr: T[] = [];
  if (local) {
    arr = JSON.parse(local);
  }
  return arr;
}

export default async function acessoLS(
  request: Login | Usuario | DadosLead | TLead | Consulta
) {
  const usuarios = getLocal<Usuario>("usuarios");
  let usuario: Usuario | undefined;
  if ("emailAutor" in request) {
    request.emailAutor = request.emailAutor.toLowerCase();
    usuario = usuarios.find((user) => user.email === request.emailAutor);
  } else if ("emailUsuario" in request) {
    request.emailUsuario = request.emailUsuario.toLowerCase();
    usuario = usuarios.find((user) => user.email === request.emailUsuario);
  } else {
    request.email = request.email.toLowerCase();
    usuario = usuarios.find((user) => user.email === request.email);
  }

  if ("emailUsuario" in request || "emailAutor" in request) {
    return lead({ usuario, request });
  }

  if ("nome" in request) {
    return cadastro({ usuario, request });
  }

  return login({ usuario, request, isNew: false });
}

function lead({
  usuario,
  request,
}: {
  usuario: Usuario | undefined;
  request: TLead | DadosLead | Consulta;
}) {
  if (!usuario) {
    return { status: 401, message: "Usuário não conectado." };
  }

  const leadsAtuais = getLocal<TLead>("leads");

  if ("emailAutor" in request) {
    const ih = getLocal<TLead>("leads").filter(
      (lead) => lead.emailUsuario === request.emailAutor
    );
    return getLocal<TLead>("leads").filter(
      (lead) => lead.emailUsuario === request.emailAutor
    ) as TLead[];
  }

  if ("id" in request === false) {
    const novaLead: TLead = {
      ...request,
      id: Math.floor(Math.random() * 10_000),
      status: "Cliente Potencial",
    };

    leadsAtuais.push(novaLead);

    localStorage.setItem("leads", JSON.stringify(leadsAtuais));

    return { status: 201, novaLead };
  }

  const status = ["Cliente Potencial", "Dados Confirmados", "Análise do Lead"];

  const leadAlvo = leadsAtuais.find(
    (lead) =>
      lead.emailUsuario === request.emailUsuario &&
      lead.id === (request as TLead).id
  );

  if (!leadAlvo) {
    return { status: 404, message: "Id da Lead inválido." };
  }

  const statusAtual = status.findIndex((st) => st === leadAlvo.status);
  const novoStatus = status.findIndex((st) => st === (request as TLead).status);

  if (statusAtual === novoStatus) {
    return { status: 200, message: "Lead não alterada." };
  }

  if (statusAtual > novoStatus) {
    return {
      status: 400,
      message: "Não é possível retornar uma lead a um status anterior.",
    };
  }

  const novaLead: TLead = {
    ...leadAlvo,
    status: (request as TLead).status,
  };

  const novasLeads: TLead[] = [
    novaLead,
    ...leadsAtuais.filter(
      (lead) =>
        lead.id !== (request as TLead).id &&
        lead.emailUsuario !== request.emailUsuario
    ),
  ];

  localStorage.setItem("leads", JSON.stringify(novasLeads));

  return {
    status: 200,
    message: "Status da lead alterado com sucesso.",
    novaLead,
  };
}

async function login({
  usuario,
  request,
  isNew,
}: {
  usuario: Usuario | undefined;
  request: Login;
  isNew: boolean;
}) {
  if (isNew) {
    return { status: 200, usuario, message: "Usuário cadastrado com sucesso." };
  }

  if (!usuario) {
    return { status: 404, message: "Usuário não encontrado." };
  }

  if (usuario.senha !== request.senha) {
    return { status: 401, message: "Senha incorreta." };
  }

  return { status: 200, usuario };
}

async function cadastro({
  usuario,
  request,
}: {
  usuario: Usuario | undefined;
  request: Usuario;
}) {
  if (usuario) {
    return { status: 400, message: "Usuário já cadastrado." };
  }

  const usuarios = getLocal<Usuario>("usuarios");
  const novosUsuarios = [request, ...usuarios];

  localStorage.setItem("usuarios", JSON.stringify(novosUsuarios));

  return await login({ usuario: undefined, request, isNew: true });
}

export async function fazerLogout() {
  return { status: 200 };
}
