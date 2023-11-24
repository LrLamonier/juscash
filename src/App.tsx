import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutGlobal from "./components/LayoutGlobal";
import Home from "./pages/Home";
import Leads from "./pages/Leads";

import "./App.css";

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
        element: <p>asdf</p>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
