import { INotificador } from './INotificador';

export class NotificadorComposto implements INotificador {
  constructor(private readonly notificadores: INotificador[]) {}

  enviar(telefone: string, mensagem: string): void {
    for (const notificador of this.notificadores) {
      notificador.enviar(telefone, mensagem);
    }
  }
}
