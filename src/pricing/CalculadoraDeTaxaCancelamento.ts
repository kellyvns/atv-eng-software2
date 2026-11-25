export class CalculadoraDeTaxaCancelamento {
  calcular(valor: number, inicio: Date, momentoCancelamento: Date, planoPetMais: boolean): number {
    if (valor <= 0) throw new Error("Valor inválido");

    const horas = (inicio.getTime() - momentoCancelamento.getTime()) / (60 * 60 * 1000);
    let percentual: number;
    if (horas >= 24) percentual = 0;
    else if (horas >= 2) percentual = 0.3;
    else if (horas > 0) percentual = 0.5;
    else percentual = 1;

    if (planoPetMais) percentual = percentual / 2;
    return valor * percentual;
  }
}