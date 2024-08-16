import React from "react";
import { AllRoutes } from "./routes/AllRoutes";
import { Header } from "./components/Header";
export const App = () => {
  return (
    <div>
      <Header />
      <AllRoutes />
    </div>
  );
};
