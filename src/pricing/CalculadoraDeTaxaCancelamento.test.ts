import { CalculadoraDeTaxaCancelamento } from "./CalculadoraDeTaxaCancelamento";

describe("CalculadoraDeTaxaCancelamento", () => {
  const calc = new CalculadoraDeTaxaCancelamento();
  const inicio = new Date("2027-01-10T14:00:00");
  const antes = (horas: number, minutos = 0) =>
    new Date(inicio.getTime() - (horas * 60 + minutos) * 60_000);

  it("não cobra taxa com 48h de antecedência", () => {
    expect(calc.calcular(120, inicio, antes(48), false)).toBe(0);
  });

  it("não cobra taxa com 24h exatas de antecedência", () => {
    expect(calc.calcular(120, inicio, antes(24), false)).toBe(0);
  });

  it("cobra 30% com 23h59min de antecedência", () => {
    expect(calc.calcular(120, inicio, antes(23, 59), false)).toBe(36);
  });

  it("cobra 30% com 2h exatas de antecedência", () => {
    expect(calc.calcular(120, inicio, antes(2), false)).toBe(36);
  });

  it("cobra 50% com 1h59min de antecedência", () => {
    expect(calc.calcular(120, inicio, antes(1, 59), false)).toBe(60);
  });

  it("cobra 100% quando cancela na hora da consulta", () => {
    expect(calc.calcular(120, inicio, antes(0), false)).toBe(120);
  });

  it("cobra 100% quando a consulta já começou", () => {
    expect(calc.calcular(120, inicio, antes(-1), false)).toBe(120);
  });

  it("corta a taxa pela metade para cliente Pet+", () => {
    expect(calc.calcular(120, inicio, antes(1), true)).toBe(30);
  });

  it("lança erro quando o valor é zero", () => {
    expect(() => calc.calcular(0, inicio, antes(48), false)).toThrow("Valor inválido");
  });
});