import acessoLS from "./acessoLS";

export default async function Login(email: string, senha: string) {
  try {
    const usuarioLogado = await acessoLS({ email, senha });

    if ("usuario" in usuarioLogado) {
      return usuarioLogado.usuario;
    }

    return usuarioLogado.message;
  } catch (err) {
    console.log((err as Error).message);
  }
}
