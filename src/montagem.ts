import { CalculadoraDePreco } from "./pricing/CalculadoraDePreco";
import { CalculadoraDeTaxaCancelamento } from "./pricing/CalculadoraDeTaxaCancelamento";
import {
  PrecoBanhoTosa,
  PrecoCirurgia,
  PrecoConsulta,
  PrecoVacina,
} from "./pricing/regras";
import { RepositorioEmMemoria } from "./repositories/RepositorioEmMemoria";
import { ZapLegacySDK } from "./libs/zap-legacy-sdk";
import { ZapAdapter } from "./notifications/ZapAdapter";
import { EmailFakeNotificador } from "./notifications/EmailFakeNotificador";
import { NotificadorComposto } from "./notifications/NotificadorComposto";
import { ClinicaFacade } from "./facade/ClinicaFacade";

const TOKEN_ZAP = "TOKEN-123";

export function montarFacade(): ClinicaFacade {
  const calculadora = new CalculadoraDePreco([
    new PrecoConsulta(),
    new PrecoVacina(),
    new PrecoCirurgia(),
    new PrecoBanhoTosa(),
  ]);

  const repositorio = new RepositorioEmMemoria();

  const notificador = new NotificadorComposto([
    new ZapAdapter(new ZapLegacySDK(TOKEN_ZAP)),
    new EmailFakeNotificador(),
  ]);

  return new ClinicaFacade(
    repositorio,
    calculadora,
    notificador,
    new CalculadoraDeTaxaCancelamento(),
  );
}