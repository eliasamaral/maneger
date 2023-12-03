import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./routes";

import { GlobalStyle } from "./GlobalStyle";

import Login from "./pages/Login";
import Home from "./pages/Home";
import RDO from "./pages/RDO";
import Projetos from "./pages/Projetos";
import CreateProject from "./pages/Cadastrar Projeto";
import Projeto from "./pages/Projeto";
import Codigos from "./Tabelas/Codigos";
import Tamplate from "./components/Tamplate";
import Contratos from "./pages/Contratos";
import { AuthProvider } from "./utility/context/authContext";
import PontoProvider from "./utility/context/pontoContext";

function App() {
  return (
    <AuthProvider>
      <PontoProvider>
        <Router>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Tamplate />}>
                <Route path="/" element={<Home />} />
                <Route path="/projetos" element={<Projetos />} />
                <Route
                  path="/projetos/createProject"
                  element={<CreateProject />}
                />
                <Route path="/projeto/:id" element={<Projeto />} />
                <Route path="/rdo" element={<RDO />} />
                <Route path="/codigos" element={<Codigos />} />
                <Route path="/contratos" element={<Contratos />} />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </PontoProvider>
    </AuthProvider>
  );
}

export default App;
