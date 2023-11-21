import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

import { Provider } from "react-redux";

import { store } from "../store/store";

export default function LayoutGlobal() {
  return (
    <>
      <Provider store={store}>
        <div style={{ minHeight: "100vh" }}>
          <NavBar />
          <Outlet />
        </div>
      </Provider>
    </>
  );
}
