import { gql } from "@apollo/client";

export const CREATE_PROJETO = gql`
  mutation (
    $projeto: Float
    $cidade: String
    $contrato: Float
    $local: String
    $csd: String
    $diagrama: Float
    $fiscal: String
    $tipo: String
    $coord: CoordInput
    $RDODigital: [RDODigitalInput]
  ) {
    createProjeto(
      data: {
        projeto: $projeto
        cidade: $cidade
        contrato: $contrato
        local: $local
        csd: $csd
        diagrama: $diagrama
        fiscal: $fiscal
        tipo: $tipo
        coord: $coord
        RDODigital: $RDODigital
      }
    ) {
      projeto
    }
  }
`;

export const GET_CODIGOS = gql`
  query {
    codigos {
      code
      description
      fator
      id
      peso
      tipo
    }
  }
`;

export const GET_PROJETOS = gql`
  query {
    getProjetos {
      id
      projeto
      local
    }
  }
`;

export const GET_RDOS = gql`
  query {
    getRDOS {
      _id
      encarregado
      dataDaProducao
    }
  }
`;

export const GET_RDO = gql`
  query ($_id: ID!) {
    getRDO(_id: $_id) {
      _id
      clima {
        manha
        tarde
      }
      createdAt
      dataDaProducao
      diagrama
      encarregado
      isFinal
      local
      maoDeObra {
        auxiliar
        eletricista
        encarregado
        motorista
      }
      observacoes
      projeto
      servicos {
        _id
        codigo
        descricao
        quantidade
      }
    }
  }
`;

export const GET_PROJETO = gql`
  query ($projeto: Float!) {
    getProjeto(projeto: $projeto) {
      local
      cidade
      contrato
      csd
      diagrama
      fiscal
      id
      projeto
      tipo
      coord {
        x
        y
      }
      pontos {
        id
        status
        ref
        tipo
        material {
          codigo
          descricao
          id
          qnt
        }
        pendencias {
          createdAt
          descricao
          id
        }
        srv {
          codigo
          descricao
          id
          qntExecutada
          qntOrcada
        }
      }
    }
  }
`;

export const DELETE_PROJETOS = gql`
  mutation ($id: ID!) {
    deleteProjeto(id: $id)
  }
`;

export const LOGIN_USER = gql`
  mutation login($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      email
      administrador
      token
    }
  }
`;

export const GET_CONTRATOS = gql`
  query {
    contratos {
      id
      numero
      fator
    }
  }
`;
