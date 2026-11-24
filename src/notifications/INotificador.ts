export interface INotificador {
  enviar(telefone: string, mensagem: string): void;
}
