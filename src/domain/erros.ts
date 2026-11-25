export class ConsultaNaoEncontradaError extends Error {
  constructor(id: number) {
    super(`Consulta ${id} não encontrada.`);
    this.name = "ConsultaNaoEncontradaError";
  }
}

export class ConsultaJaCanceladaError extends Error {
  constructor(id: number) {
    super(`Consulta ${id} já está cancelada.`);
    this.name = "ConsultaJaCanceladaError";
  }
}