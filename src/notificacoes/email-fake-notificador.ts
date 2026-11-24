
import { INotificador } from "./i-notificador";
import { Consulta } from "../dominio/consulta";

export class EmailFakeNotificador implements INotificador {
  enviar(consulta: Consulta): void {
    console.log("Enviando e-mail para o tutor:", consulta.tutor);
    console.log("Assunto: Confirmação de agendamento");

    console.log(
      `O agendamento do pet ${consulta.pet} foi confirmado.`
    );
  }
}
