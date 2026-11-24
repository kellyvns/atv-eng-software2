
import { INotificador } from "./i-notificador";
import { Consulta } from "../dominio/consulta";
import { ZapLegacySDK } from "../libs/zap-legacy-sdk";

export class ZapAdapter implements INotificador {
  constructor(private zap: ZapLegacySDK) {}

  enviar(consulta: Consulta): void {
    this.zap.dispararMsg(consulta.telefone, {
      txt: `Olá ${consulta.tutor}! O agendamento do pet ${consulta.pet} foi realizado. Valor: R$ ${consulta.valor.toFixed(2)}.`
    });
  }
}
