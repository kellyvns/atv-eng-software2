import { Consulta, NovaConsulta } from "../domain/Consulta";
import { TipoAtendimento } from "../domain/TipoAtendimento";
import { CalculadoraDePreco } from "../pricing/CalculadoraDePreco";
import { IRepositorioConsultas } from "../repositories/IRepositorioConsultas";
import { INotificador } from "../notifications/INotificador";

const FORMATO_TELEFONE = /^\d{10,11}$/; 

export class ClinicaFacade {
  constructor(
    private readonly repositorio: IRepositorioConsultas,
    private readonly calculadora: CalculadoraDePreco,
    private readonly notificador: INotificador,
  ) {}

  agendar(dados: NovaConsulta): Consulta {
    this.validar(dados);

    const valor = this.calculadora.calcular(dados.tipo, dados.planoPetMais);
    const consulta = this.repositorio.salvar({
      ...dados,
      valor,
      status: "AGENDADA",
    });

    this.notificador.enviar(
      consulta.telefone,
      this.mensagemDeAgendamento(consulta),
    );
    return consulta;
  }

  cancelar(id: number): Consulta {
    const consulta = this.repositorio.buscarPorId(id);
    if (!consulta) throw new Error(`Consulta ${id} não encontrada.`);
    if (consulta.status === "CANCELADA")
      throw new Error(`Consulta ${id} já está cancelada.`);

    const consultaCancelada: Consulta = { ...consulta, status: "CANCELADA" };
    this.repositorio.atualizar(consultaCancelada);
    return consultaCancelada;
  }

  listar(): Consulta[] {
    return this.repositorio.listar();
  }

  private validar(dados: NovaConsulta): void {
    if (!dados.tutor?.trim()) throw new Error("O nome do tutor é obrigatório.");
    if (!dados.telefone?.trim()) throw new Error("O telefone é obrigatório.");
    if (!FORMATO_TELEFONE.test(dados.telefone)) {
      throw new Error(
        "O telefone deve conter apenas dígitos, com DDD (ex.: 31999990000).",
      );
    }
    if (!dados.pet?.trim()) throw new Error("O nome do pet é obrigatório.");
    if (!Object.values(TipoAtendimento).includes(dados.tipo)) {
      throw new Error("O tipo de atendimento é obrigatório.");
    }
    if (!(dados.dataHora instanceof Date) || isNaN(dados.dataHora.getTime())) {
      throw new Error(
        "A data e hora da consulta são obrigatórias e devem ser válidas.",
      );
    }
  }

  private mensagemDeAgendamento(consulta: Consulta): string {
    return (
      `Olá ${consulta.tutor}! A consulta do ${consulta.pet} foi agendada para ` +
      `${this.formatarDataHora(consulta.dataHora)}. Valor: ${this.formatarValor(consulta.valor)}`
    );
  }

  private formatarDataHora(data: Date): string {
    const doisDigitos = (n: number) => String(n).padStart(2, "0");
    return (
      `${doisDigitos(data.getDate())}/${doisDigitos(data.getMonth() + 1)}/${data.getFullYear()} ` +
      `${doisDigitos(data.getHours())}:${doisDigitos(data.getMinutes())}`
    );
  }

  private formatarValor(valor: number): string {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
  }
}
