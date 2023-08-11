export const data2 = {
  projeto: 400135421,
  diagrama: 400215487,
  local: "Fazenda Cascavel",
  cidade: "São Lourenço",
  csd: "Cascavel",
  fiscal: "Pedro",
  tipo: "Ponto de entrega",
  pontos: [
    {
      id: 1,
      tipo: "instalação",
      status: "pendencias",
      pendencias: [
        {
          id: 1,
          description: "Falta Aterrar",
        },
        {
          id: 2,
          description: "Faltar Concretar",
        },
      ],
    },
    {
      id: 2,
      tipo: "remoção",
      status: "pendencias",
      pendencias: [
        {
          id: 1,
          description: "remover sucata",
        },
      ],
    },
    {
      id: 3,
      tipo: "remoção",
      status: "pronto",
      pendencias: [],
    },
    {
      id: 4,
      tipo: "remoção",
      status: "neutro",
      pendencias: [],
    },
  ],
};

export const data = {
  projeto: 400135421,
  diagrama: 400215487,
  local: "Fazenda Cascavel",
  cidade: "São Lourenço",
  csd: "Cascavel",
  fiscal: "Pedro",
  tipo: "Ponto de entrega",
  pontos: [
    {
      id: 1,
      tipo: "instalação",
      status: "pendencias",
      material: [
        {
          id: 1,
          codigo: 10009988,
          descricao: "Poste",
          qnt: 1,
        },
      ],
      srv: [
        {
          id: 1,
          codigo: 71001521,
          descricao: "Concretar",
          qntOrcada: 1,
          qntExecutada: 1,
        },
      ],

      srvADS: [
        {
          codigo: 71010037,
          descricao: "13.2 - CONCRETAR BASE",
          qnt: 1
        },
      ],
      pendencias: [
        {
          id: 1,
          description: "Falta Aterrar",
          dataSinalizaçao: "10/05/2020",
        },
        {
          id: 2,
          description: "Faltar Concretar",
          dataSinalizaçao: "10/05/2020",
        },
      ],
    },
  ],
};
