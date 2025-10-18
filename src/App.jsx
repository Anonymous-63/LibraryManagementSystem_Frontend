import { BrowserRouter, useNavigate } from "react-router";
import { AppRoutes } from "./app/router/routes";
import { useEffect } from "react";
import { NavigationService } from "./app/router/NavigationService";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <InitNavigation />
        <AppRoutes />
      </BrowserRouter>
    </>
  )
}

function InitNavigation() {
  const navigate = useNavigate();
  useEffect(() => {
    NavigationService.setNavigate(navigate);
  }, [navigate]);
  return null;
}
