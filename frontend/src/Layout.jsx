import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-slate-100">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
