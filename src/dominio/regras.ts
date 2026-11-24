
import { RegraDePreco } from "./regra-de-preco";

export class PrecoConsulta implements RegraDePreco {
  calcular(): number {
    return 120;
  }
}

export class PrecoVacina implements RegraDePreco {
  calcular(): number {
    return 80;
  }
}

export class PrecoCirurgia implements RegraDePreco {
  calcular(): number {
    return 540;
  }
}

export class PrecoBanhoTosa implements RegraDePreco {
  calcular(): number {
    return 65;
  }
}
