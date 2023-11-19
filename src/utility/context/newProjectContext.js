import React, { createContext, useState } from "react";

export const NewProjectContext = createContext(null);

const createProjeto = {
  cidade: "",
  contrato: 0,
  csd: "",
  diagrama: 0,
  fiscal: "",
  projeto: 0,
  tipo: "",
  local: "",
  RDODigital: [],
  pontos:[
    {
      ref: 0,
      status: "",
      tipo: "",
      srv: [],
      material: [],
      pendencias: [],
    
    }
  ]
}

export default function NewProjectProvider({ children }) {
  const [projectData, setProjectData] = useState(createProjeto);

  return (
    <NewProjectContext.Provider value={{ projectData, setProjectData}}>
      {children}
    </NewProjectContext.Provider>
  );
}

