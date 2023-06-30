import Main from "./Pages/Main/Main";
import { useRoutes, BrowserRouter } from "react-router-dom";
import "./styles/App.css";

function Router(props) {
  return useRoutes(props.rootRoute);
}

function App() {
  const routes = [
    { path: "art-gallery-home-page/paintings", element: <Main /> },
    { path: "art-gallery-home-page", element: <Main /> },
  ];
  const rootRoute = [{ path: "/", children: routes }];
  return (
    <BrowserRouter>
      <Router rootRoute={rootRoute} />
    </BrowserRouter>
  );
}

export default App;
