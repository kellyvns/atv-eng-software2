import { Consulta } from "../domain/Consulta";
import { IRepositorioConsultas } from "./IRepositorioConsultas";

export class RepositorioEmMemoria implements IRepositorioConsultas {
  private readonly consultas = new Map<number, Consulta>();
  private proximoId = 1;

  salvar(consulta: Omit<Consulta, "id">): Consulta {
    const consultaSalva: Consulta = { ...consulta, id: this.proximoId++ };
    this.consultas.set(consultaSalva.id, consultaSalva);
    return { ...consultaSalva };
  }

  buscarPorId(id: number): Consulta | undefined {
    const consulta = this.consultas.get(id);
    return consulta ? { ...consulta } : undefined;
  }

  atualizar(consulta: Consulta): void {
    if (!this.consultas.has(consulta.id)) {
      throw new Error(
        `Consulta ${consulta.id} não encontrada para atualização.`,
      );
    }
    this.consultas.set(consulta.id, { ...consulta });
  }

  listar(): Consulta[] {
    return [...this.consultas.values()].map((consulta) => ({ ...consulta }));
  }
}
