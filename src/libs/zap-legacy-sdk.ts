
export class ZapLegacySDK {
  dispararMsg(
    numero: string,
    conteudo: { txt: string }
  ): { ok: boolean } {
    console.log("Enviando mensagem para:", numero);
    console.log("Mensagem:", conteudo.txt);

    return { ok: true };
  }
}
