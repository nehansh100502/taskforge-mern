// src/Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import GoogleAuthProvider from "./components/GoogleAuthProvider";

const Layout = () => {
  return (
    <GoogleAuthProvider>
      <AuthProvider>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow bg-slate-100">
              <Outlet />
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </AuthProvider>
    </GoogleAuthProvider>
  );
};

export default Layout;