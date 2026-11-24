import { Consulta } from '../domain/Consulta';

export interface IRepositorioConsultas {
  salvar(consulta: Omit<Consulta, 'id'>): Consulta;           // o repositório gera o id
  buscarPorId(id: number): Consulta | undefined;
  atualizar(consulta: Consulta): void;
  listar(): Consulta[];
}
