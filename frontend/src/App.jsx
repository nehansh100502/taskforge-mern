import {} from "react";
import Layout from "./Layout";
import { RouterProvider } from "react-router-dom";
import { myRoutes } from "./Routes/Router";
import GoogleAuthProvider from "./components/GoogleAuthProvider";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
     <GoogleAuthProvider>
     <AuthProvider>
      <RouterProvider router={myRoutes} />
      </AuthProvider>
      </GoogleAuthProvider>
    </>
  );
}

export default App;
