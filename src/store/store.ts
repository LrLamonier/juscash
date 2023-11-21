import { configureStore } from "@reduxjs/toolkit";

import logadoSlice from "./slices/sliceUsuario";
import leadsSlice from "./slices/sliceLead";

export const store = configureStore({
  reducer: {
    logado: logadoSlice,
    leads: leadsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
