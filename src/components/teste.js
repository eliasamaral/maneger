import * as XLSX from "xlsx";

export function processarArquivo(arquivo) {
  return new Promise((resolve, reject) => {
    const input = arquivo.target.files[0];
    const leitor = new FileReader();

    leitor.onload = ({ target: { result } }) => {
      const pastaDeTrabalho = XLSX.read(result, { type: "binary" });
      const planilha = pastaDeTrabalho.Sheets[pastaDeTrabalho.SheetNames[1]];
      const dados = XLSX.utils.sheet_to_json(planilha, { header: 2 });
      resolve(dados);
    };

    leitor.onerror = (erro) => {
      reject(erro);
    };

    leitor.readAsBinaryString(input);
  });
}
export const filter = (array, unidade) => {
  const itensFiltradosPorSRV = array.filter(
    (item) => item["Unid."] === unidade
  );

  const codigosFiltrosPorChave = itensFiltradosPorSRV.map((item) => ({
    codigo: item["Código"],
    descricao: item["Descrição"],
    planejado: item["Planejado"],
    // valor: item["Valor Material"], 

  }));

  const codigosAgrupadosESomados = codigosFiltrosPorChave.reduce(
    (agrupado, item) => {
      const { codigo, planejado, valor } = item;

      if (agrupado[codigo]) {
        agrupado[codigo].planejado += planejado;
        // agrupado[codigo].valor += valor; // Sum the "valor" field as well
      } else {
        agrupado[codigo] = { ...item, planejado, valor };
      }

      return agrupado;
    },
    {}
  );

  const codigosFinal = Object.values(codigosAgrupadosESomados);
  return codigosFinal;
};
