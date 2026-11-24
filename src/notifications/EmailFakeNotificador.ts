import { INotificador } from './INotificador';

export class EmailFakeNotificador implements INotificador {
  enviar(telefone: string, mensagem: string): void {
    console.log(`[EMAIL fake] -> tutor do telefone ${telefone}: ${mensagem}`);
  }
}
