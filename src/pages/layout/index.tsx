import { AuthContext } from "@/contexts";
import { useContext } from "react";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}