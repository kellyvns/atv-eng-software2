import { ClinicaFacade } from "./ClinicaFacade";
import { INotificador } from "../notifications/INotificador";
import { RepositorioEmMemoria } from "../repositories/RepositorioEmMemoria";
import { CalculadoraDePreco } from "../pricing/CalculadoraDePreco";
import { PrecoCirurgia, PrecoConsulta, PrecoVacina } from "../pricing/regras";
import { NovaConsulta } from "../domain/Consulta";
import { TipoAtendimento } from "../domain/TipoAtendimento";
import { ConsultaJaCanceladaError, ConsultaNaoEncontradaError } from "../domain/erros";

describe("ClinicaFacade", () => {
  const notificador: INotificador = { enviar: jest.fn() };
  const repositorio = new RepositorioEmMemoria(); // stub simples e real
  const calculadora = new CalculadoraDePreco([
    new PrecoConsulta(),
    new PrecoVacina(),
    new PrecoCirurgia(),
  ]);
  const facade = new ClinicaFacade(repositorio, calculadora, notificador);

  const dadosValidos: NovaConsulta = {
    tutor: "Ana",
    telefone: "31999990000",
    pet: "Thor",
    tipo: TipoAtendimento.CONSULTA,
    dataHora: new Date("2027-01-10T14:00:00"),
    planoPetMais: false,
  };

  beforeEach(() => jest.clearAllMocks());

  it("notifica o tutor uma única vez ao agendar", () => {
    facade.agendar(dadosValidos);
    expect(notificador.enviar).toHaveBeenCalledTimes(1);
    expect(notificador.enviar).toHaveBeenCalledWith(
      "31999990000",
      expect.stringContaining("Thor"),
    );
  });

  const casosInvalidos: [string, Partial<NovaConsulta>][] = [
    ["tutor vazio", { tutor: "" }],
    ["telefone vazio", { telefone: "" }],
    ["telefone com letras", { telefone: "31abc" }],
    ["pet vazio", { pet: "" }],
    ["tipo inexistente", { tipo: "TOSA" as TipoAtendimento }],
    ["data inválida", { dataHora: new Date("data errada") }],
  ];

  it.each(casosInvalidos)("não notifica quando os dados são inválidos (%s)", (_caso, alteracao) => {
    expect(() => facade.agendar({ ...dadosValidos, ...alteracao })).toThrow();
    expect(notificador.enviar).not.toHaveBeenCalled();
  });

  it("aplica 20% de desconto do Plano Pet+ (R$ 96)", () => {
    const consulta = facade.agendar({ ...dadosValidos, planoPetMais: true });
    expect(consulta.valor).toBe(96);
  });

  it("lança erro ao cancelar consulta inexistente", () => {
    expect(() => facade.cancelar(999)).toThrow(ConsultaNaoEncontradaError);
  });

  it("cancela com taxa de 50% quando falta 1h para a consulta", () => {
    const consulta = facade.agendar(dadosValidos);
    const umaHoraAntes = new Date("2027-01-10T13:00:00");

    const cancelada = facade.cancelar(consulta.id, umaHoraAntes);

    expect(cancelada.status).toBe("CANCELADA");
    expect(cancelada.taxaCancelamento).toBe(60);
  });

  it("lança erro ao cancelar a mesma consulta duas vezes", () => {
    const consulta = facade.agendar(dadosValidos);
    facade.cancelar(consulta.id);
    expect(() => facade.cancelar(consulta.id)).toThrow(ConsultaJaCanceladaError);
  });
});