import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, Router } from "react-router-dom";
import { useIntegration } from "@telegram-apps/react-router-integration";
import { initNavigator } from "@telegram-apps/sdk-react";
import { useEffect, useMemo } from "react";
import { Provider } from "./context/ContextProvider";
import { routes } from "./navigation/Routes";
import Layout from "./providers/Layout";

function App() {
  // Initialize the navigator as before
  const navigator = useMemo(() => initNavigator("app-navigation-state"), []);
  const [location, reactNavigator] = useIntegration(navigator);

  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  return (
    <div className="bg-black">
      <BrowserRouter location={location} navigator={reactNavigator}>

          <Layout>
        <Provider>
            
          <Routes>
            {routes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Provider>
            </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
