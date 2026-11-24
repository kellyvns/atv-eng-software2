import { Consulta } from "../dominio/consulta";
import { IRepositorioConsultas } from "./i-repositorio-consultas";

export class RepositorioEmMemoria implements IRepositorioConsultas {
  private consultas: Consulta[] = [];

  salvar(consulta: Consulta): void {
    this.consultas.push(consulta);
  }

  buscarPorId(id: number): Consulta | undefined {
    return this.consultas.find((consulta) => consulta.id === id);
  }

  listar(): Consulta[] {
    return [...this.consultas];
  }
}
