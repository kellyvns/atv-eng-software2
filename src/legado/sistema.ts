
import { ZapLegacySDK } from "../libs/zap-legacy-sdk";

export class SistemaAgendamento {
  private consultas: any[] = [];
  private proximoId = 1;
  private zap = new ZapLegacySDK();

  agendar(
    tutor: string,
    telefone: string,
    pet: string,
    tipo: string,
    dataHora: string,
    planoPetMais: boolean
  ): void {
    let valor = 120;

    if (tipo === "VACINA") {
      valor = 80;
    } else if (tipo === "CIRURGIA") {
      valor = 540;
    }

    if (planoPetMais) {
      valor = valor * 0.8;
    }

    const consulta = {
      id: this.proximoId++,
      tutor,
      telefone,
      pet,
      tipo,
      dataHora,
      planoPetMais,
      valor,
      status: "AGENDADA"
    };

    this.consultas.push(consulta);

    this.zap.dispararMsg(telefone, {
      txt: `Olá ${tutor}! O agendamento do pet ${pet} foi realizado. Valor: R$ ${valor}.`
    });
  }

  cancelar(id: number): void {
    const consulta = this.consultas.find(c => c.id === id);

    if (consulta) {
      consulta.status = "CANCELADA";
    }
  }

  listar(): any[] {
    return this.consultas;
  }
}
