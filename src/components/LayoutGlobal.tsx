import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function LayoutGlobal() {
  return (
    <>
      <NavBar />
      <body>
        <Outlet />
      </body>
    </>
  );
}
