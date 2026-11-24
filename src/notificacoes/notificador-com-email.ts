import { INotificador } from "./i-notificador";
import { Consulta } from "../dominio/consulta";

export class NotificadorComEmail implements INotificador {
  constructor(
    private notificador: INotificador,
    private email: INotificador,
  ) {}

  enviar(consulta: Consulta): void {
    this.notificador.enviar(consulta);
    this.email.enviar(consulta);
  }
}
