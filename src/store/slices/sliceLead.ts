import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Lead } from "../../utils/acessoLS";

const leadsIniciais: Lead[] = [];

function getLeadsFn(
  state: typeof leadsIniciais,
  action: PayloadAction<Lead[]>
) {
  return action.payload;
}

function limparLeadsFn() {
  return leadsIniciais;
}

const leadsSlice = createSlice({
  name: "leads",
  initialState: leadsIniciais,
  reducers: {
    getLeads: getLeadsFn,
    limparLeads: limparLeadsFn,
  },
});

export const { getLeads, limparLeads } = leadsSlice.actions;
export default leadsSlice.reducer;
