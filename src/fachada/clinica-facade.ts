
import { Consulta, TipoConsulta } from "../dominio/consulta";
import { ICalculadoraPreco } from "../dominio/regra-de-preco";
import { IRepositorioConsultas } from "../repositorios/i-repositorio-consultas";
import { INotificador } from "../notificacoes/i-notificador";

export interface DadosAgendamento {
  tutor: string;
  telefone: string;
  pet: string;
  tipo: TipoConsulta;
  dataHora: string;
  planoPetMais: boolean;
}

export class ClinicaFacade {
  private proximoId = 1;

  constructor(
    private repositorio: IRepositorioConsultas,
    private calculadora: ICalculadoraPreco,
    private notificador: INotificador
  ) {}

  agendar(dados: DadosAgendamento): Consulta {
    const valor = this.calculadora.calcular(
      dados.tipo,
      dados.planoPetMais
    );

    const consulta = new Consulta({
      id: this.proximoId++,
      ...dados,
      valor
    });

    this.repositorio.salvar(consulta);
    this.notificador.enviar(consulta);

    return consulta;
  }

  cancelar(id: number): boolean {
    const consulta = this.repositorio.buscarPorId(id);

    if (!consulta) {
      return false;
    }

    consulta.cancelar();
    return true;
  }

  listar(): Consulta[] {
    return this.repositorio.listar();
  }
}
