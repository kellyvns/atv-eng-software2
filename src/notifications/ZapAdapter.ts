import { ZapLegacySDK } from '../libs/zap-legacy-sdk';
import { INotificador } from './INotificador';

const DDI_BRASIL = '55';

export class ZapAdapter implements INotificador {
  constructor(private readonly sdk: ZapLegacySDK) {}

  enviar(telefone: string, mensagem: string): void {
    const resposta = this.sdk.dispararMsg(DDI_BRASIL + telefone, { txt: mensagem });
    if (!resposta.ok) throw new Error('Falha ao notificar');
  }
}
