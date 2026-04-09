import {} from "react";
import Layout from "./Layout";
import { RouterProvider } from "react-router-dom";
import { myRoutes } from "./Routes/Router";
import GoogleAuthProvider from "./components/GoogleAuthProvider";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
     <GoogleAuthProvider>
     <AuthProvider>
      <RouterProvider router={myRoutes} />
      <ToastContainer position="top-right" autoClose={2000} />
      </AuthProvider>
      </GoogleAuthProvider>
    </>
  );
}

export default App;
