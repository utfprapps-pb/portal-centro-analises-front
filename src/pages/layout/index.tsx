import { AuthContext } from "@/contexts";
import { useContext } from "react";
import { Outlet } from "react-router-dom";

export function Layout() {
  const { authenticated, authenticatedUser} = useContext(AuthContext);
  return (
    <>
      <main>
        <Outlet />
        {authenticatedUser?.displayName} - {authenticatedUser?.role}
      </main>
    </>
  );
}