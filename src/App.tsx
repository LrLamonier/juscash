import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store/store";
import Home from "./pages/Home";
import LayoutGlobal from "./components/LayoutGlobal";

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
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
