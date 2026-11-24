import { TipoConsulta } from "./consulta";
import { RegraDePreco } from "./regra-de-preco";

export class CalculadoraPreco {
  constructor(private regras: Record<TipoConsulta, RegraDePreco>) {}

  calcular(tipo: TipoConsulta, planoPetMais: boolean): number {
    const regra = this.regras[tipo];

    if (!regra) {
      throw new Error("Tipo de atendimento não encontrado.");
    }

    let valor = regra.calcular();

    if (planoPetMais) {
      valor *= 0.8;
    }

    return Number(valor.toFixed(2));
  }
}
