import { CalculadoraDePreco } from "./CalculadoraDePreco";
import { PrecoBanhoTosa, PrecoConsulta } from "./regras";
import { TipoAtendimento } from "../domain/TipoAtendimento";

describe("CalculadoraDePreco", () => {
  const calculadora = new CalculadoraDePreco([new PrecoConsulta(), new PrecoBanhoTosa()]);

  it("usa o preço cheio quando o plano não é informado", () => {
    expect(calculadora.calcular(TipoAtendimento.BANHO_TOSA)).toBe(65);
  });

  it("aplica o desconto do Plano Pet+ com o Decorator", () => {
    expect(calculadora.calcular(TipoAtendimento.BANHO_TOSA, true)).toBe(52);
  });

  it("lança erro para tipo sem regra registrada", () => {
    expect(() => calculadora.calcular(TipoAtendimento.CIRURGIA)).toThrow(
      "Tipo de atendimento não suportado",
    );
  });
});