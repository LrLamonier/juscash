import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "../pages/Home";

import { Provider } from "react-redux";

import { store } from "../store/store";

export default function LayoutGlobal() {
  return (
    <>
      <Provider store={store}>
        <body style={{ minHeight: "100vh" }}>
          <NavBar />
          <Outlet />
        </body>
      </Provider>
    </>
  );
}
