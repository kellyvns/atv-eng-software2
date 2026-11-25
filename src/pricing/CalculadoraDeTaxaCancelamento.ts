export class CalculadoraDeTaxaCancelamento {
  calcular(valor: number, inicio: Date, momentoCancelamento: Date, planoPetMais: boolean): number {
    const horas = (inicio.getTime() - momentoCancelamento.getTime()) / (60 * 60 * 1000);
    if (horas >= 24) return 0;
    return valor * 0.3;
  }
}