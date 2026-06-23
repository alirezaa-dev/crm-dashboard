import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-col flex-1 ">
        <main className="flex flex-col gap-8 p-4 overflow-y-auto mt-8  ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
