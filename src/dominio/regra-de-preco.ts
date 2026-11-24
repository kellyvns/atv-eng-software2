
import { TipoConsulta } from "./consulta";

export interface RegraDePreco {
  calcular(): number;
}

export interface ICalculadoraPreco {
  calcular(
    tipo: TipoConsulta,
    planoPetMais: boolean
  ): number;
}


export interface RegraDePreco {
  calcular(): number;
}
