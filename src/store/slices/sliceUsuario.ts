import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Usuario } from "../../utils/acessoLS";

const logadoInicial: Usuario | null = null;

function loginFn(state: typeof logadoInicial, action: PayloadAction<Usuario>) {
  if (!state || !action.payload) {
    return;
  }
  state = action.payload;
}

function logoutFn() {
  return null;
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
