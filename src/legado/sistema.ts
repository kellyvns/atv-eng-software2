import { ZapLegacySDK } from "../libs/zap-legacy-sdk";

export class GerenciadorClinica {
  lista: any[] = [];
  zap = new ZapLegacySDK("TOKEN-123");

  fazer(d: any) {
    if (!d.nome || !d.tel || !d.pet) {
      console.log("erro");
      return null;
    }
    let v = 0;
    if (d.t == 1)
      v = 120; // consulta
    else if (d.t == 2)
      v = 80; // vacina
    else if (d.t == 3) v = 120 * 4.5; // cirurgia
    if (d.plano == true) v = v - v * 0.2;
    const x = { id: this.lista.length + 1, ...d, valor: v, status: "AG" };
    this.lista.push(x);
    this.zap.dispararMsg("55" + d.tel, {
      txt: "Ola " + d.nome + ", consulta do " + d.pet + " marcada! R$" + v,
    });
    console.log("salvo " + x.id);
    return x;
  }

  cancelar(id: number) {
    for (let i = 0; i < this.lista.length; i++) {
      if (this.lista[i].id == id) {
        this.lista[i].status = "CN";
        return true;
      }
    }
    return false;
  }
}
