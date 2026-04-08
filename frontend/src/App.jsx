import {} from "react";
import Layout from "./Layout";
import { RouterProvider } from "react-router-dom";
import { myRoutes } from "./Routes/Router";

function App() {
  return (
    <>
      <RouterProvider router={myRoutes} />
    </>
  );
}

export default App;
