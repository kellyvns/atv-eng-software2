const MS_POR_HORA = 60 * 60 * 1000;

const HORAS_PARA_CANCELAR_SEM_TAXA = 24;
const HORAS_PARA_TAXA_PARCIAL = 2;

const SEM_TAXA = 0;
const TAXA_PARCIAL = 0.3; // 30%
const TAXA_EM_CIMA_DA_HORA = 0.5; // 50%
const TAXA_INTEGRAL = 1; // 100%

const FATOR_PLANO_PET_MAIS = 0.5; // a taxa cai pela metade
const CENTAVOS_POR_REAL = 100;

export class CalculadoraDeTaxaCancelamento {
  calcular(
    valor: number,
    inicio: Date,
    momentoCancelamento: Date,
    planoPetMais: boolean,
  ): number {
    if (valor <= 0) throw new Error("Valor inválido");

    const horasDeAntecedencia =
      (inicio.getTime() - momentoCancelamento.getTime()) / MS_POR_HORA;

    let percentual = this.percentualPorAntecedencia(horasDeAntecedencia);
    if (planoPetMais) percentual *= FATOR_PLANO_PET_MAIS;

    return Math.round(valor * percentual * CENTAVOS_POR_REAL) / CENTAVOS_POR_REAL;
  }

  private percentualPorAntecedencia(horas: number): number {
    if (horas >= HORAS_PARA_CANCELAR_SEM_TAXA) return SEM_TAXA;
    if (horas >= HORAS_PARA_TAXA_PARCIAL) return TAXA_PARCIAL;
    if (horas > 0) return TAXA_EM_CIMA_DA_HORA;
    return TAXA_INTEGRAL;
  }
}