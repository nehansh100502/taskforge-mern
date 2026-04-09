import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import Footer from "./components/Footer";
const Layout = () => {
  return (
    <div>
         <ThemeProvider>
      <Navbar />
      <main className="min-h-screen bg-slate-100">
        <Outlet />
      </main>
      </ThemeProvider>
      <Footer/>
    </div>
  );
};

export default Layout;
