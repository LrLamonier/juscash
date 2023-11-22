import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Usuario } from "../../utils/acessoLS";

const logadoInicial: { usuario: Usuario | null } = { usuario: null };

function loginFn(state: typeof logadoInicial, action: PayloadAction<Usuario>) {
  if (!action.payload) {
    return;
  }
  state.usuario = action.payload;
}

function logoutFn(state: typeof logadoInicial) {
  state.usuario = logadoInicial.usuario;
}

const logadoSlice = createSlice({
  name: "logado",
  initialState: logadoInicial,
  reducers: {
    login: loginFn,
    logout: logoutFn,
  },
});

export const { login, logout } = logadoSlice.actions;
export default logadoSlice.reducer;
