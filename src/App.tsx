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
import acessoLS, { TLead } from "./utils/acessoLS";

type TResposta = { status: number; leadsAtualizados: TLead[] };

const leadsLoader = async () => {
  const emailAutor = store.getState().logado.usuario?.email;
  if (!emailAutor) {
    return redirect("/");
  }
  let leads;
  try {
    leads = await acessoLS({ emailAutor });
  } catch {}
  return leads;
};

const router = createBrowserRouter([
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
