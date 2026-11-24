import { TipoConsulta } from "./consulta";

export class CalculadoraPreco {
  calcular(tipo: TipoConsulta, planoPetMais: boolean): number {
    let valor: number;

    switch (tipo) {
      case "CONSULTA":
        valor = 120;
        break;

      case "VACINA":
        valor = 80;
        break;

      case "CIRURGIA":
        valor = 540;
        break;
    }

    if (planoPetMais) {
      valor = valor * 0.8;
    }

    return valor;
  }
}
