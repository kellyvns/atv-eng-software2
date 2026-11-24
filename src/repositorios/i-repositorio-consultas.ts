
import { Consulta } from "../dominio/consulta";

export interface IRepositorioConsultas {
  salvar(consulta: Consulta): void;

  buscarPorId(id: number): Consulta | undefined;

  listar(): Consulta[];
}
