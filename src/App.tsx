import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store/store";
import Home from "./pages/Home";
import LayoutGlobal from "./components/LayoutGlobal";

import "./App.css";
import Leads from "./pages/Leads";
import ModalLead from "./components/ModalLead";
import FormLogin from "./components/FormLogin";

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
        element: <Leads />,
      },
      {
        path: "*",
        // element: <NaoEncontrado />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
