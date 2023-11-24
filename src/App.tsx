import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import LayoutGlobal from "./components/LayoutGlobal";
import Home from "./pages/Home";
import Leads from "./pages/Leads";

import "./App.css";
import { store } from "./store/store";
import { obterLeadsUsuario, TLead } from "./utils/backend";

type TResposta = { status: number; leadsAtualizados: TLead[] };

const leadsLoader = async () => {
  const emailUsuario = store.getState().logado.usuario?.email;
  if (!emailUsuario) {
    return redirect("/");
  }
  let leads;
  try {
    leads = await obterLeadsUsuario(emailUsuario);
  } catch {}
  return leads;
};

const router = createBrowserRouter(
  [
    {
      element: <LayoutGlobal />,
      path: "/",
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "leads",
          loader: leadsLoader,
          element: <Leads />,
        },
        {
          path: "*",
          element: <Home />,
        },
      ],
    },
  ],
  {
    basename: "/juscash",
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
