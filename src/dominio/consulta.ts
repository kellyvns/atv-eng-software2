
export type TipoConsulta = "CONSULTA" | "VACINA" | "CIRURGIA";

export type StatusConsulta = "AGENDADA" | "CANCELADA";

interface DadosConsulta {
  id: number;
  tutor: string;
  telefone: string;
  pet: string;
  tipo: TipoConsulta;
  dataHora: string;
  planoPetMais: boolean;
  valor: number;
}

export class Consulta {
  readonly id: number;
  readonly tutor: string;
  readonly telefone: string;
  readonly pet: string;
  readonly tipo: TipoConsulta;
  readonly dataHora: string;
  readonly planoPetMais: boolean;
  readonly valor: number;

  private status: StatusConsulta = "AGENDADA";

  constructor(dados: DadosConsulta) {
    this.id = dados.id;
    this.tutor = dados.tutor;
    this.telefone = dados.telefone;
    this.pet = dados.pet;
    this.tipo = dados.tipo;
    this.dataHora = dados.dataHora;
    this.planoPetMais = dados.planoPetMais;
    this.valor = dados.valor;
  }

  cancelar(): void {
    this.status = "CANCELADA";
  }

  getStatus(): StatusConsulta {
    return this.status;
  }
}
