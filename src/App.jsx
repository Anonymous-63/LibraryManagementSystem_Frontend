import { BrowserRouter, useNavigate } from "react-router";
import { AppRoutes } from "./app/router/routes";
import { useEffect } from "react";
import { NavigationService } from "./app/router/NavigationService";
import NotificationContainer from "./components/shared/NotificationContainer";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <InitNavigation />
        <AppRoutes />
        <NotificationContainer />
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
