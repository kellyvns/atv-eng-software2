import { TipoAtendimento } from "../domain/TipoAtendimento";
import { RegraDePreco } from "./RegraDePreco";

const PRECO_CONSULTA = 120;
const PRECO_VACINA = 80;
const PRECO_CIRURGIA = 540;
const PRECO_BANHO_TOSA = 65;

export class PrecoConsulta implements RegraDePreco {
  readonly tipo = TipoAtendimento.CONSULTA;

  calcular(): number {
    return PRECO_CONSULTA;
  }
}

export class PrecoVacina implements RegraDePreco {
  readonly tipo = TipoAtendimento.VACINA;

  calcular(): number {
    return PRECO_VACINA;
  }
}

export class PrecoCirurgia implements RegraDePreco {
  readonly tipo = TipoAtendimento.CIRURGIA;

  calcular(): number {
    return PRECO_CIRURGIA;
  }
}

export class PrecoBanhoTosa implements RegraDePreco {
  readonly tipo = TipoAtendimento.BANHO_TOSA;

  calcular(): number {
    return PRECO_BANHO_TOSA;
  }
}
