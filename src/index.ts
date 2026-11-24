import { TipoAtendimento } from "./domain/TipoAtendimento";
import { CalculadoraDePreco } from "./pricing/CalculadoraDePreco";
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

const clinica = new ClinicaFacade(repositorio, calculadora, notificador);

console.log("--- AGENDAMENTOS ---");

clinica.agendar({
  tutor: "Ana",
  telefone: "31999990000",
  pet: "Thor",
  tipo: TipoAtendimento.CONSULTA,
  dataHora: new Date(2027, 0, 10, 14, 0),
  planoPetMais: false,
});

clinica.agendar({
  tutor: "Bruno",
  telefone: "11988887777",
  pet: "Luna",
  tipo: TipoAtendimento.CIRURGIA,
  dataHora: new Date(2027, 0, 11, 9, 30),
  planoPetMais: true,
});

const banhoTosa = clinica.agendar({
  tutor: "Carla",
  telefone: "21977776666",
  pet: "Mel",
  tipo: TipoAtendimento.BANHO_TOSA,
  dataHora: new Date(2027, 0, 12, 16, 0),
  planoPetMais: false,
});

console.log("\n--- LISTAGEM DE CONSULTAS ---");
console.table(clinica.listar());

console.log("\n--- CANCELAMENTO ---");
const cancelada = clinica.cancelar(banhoTosa.id);
console.log(
  `Consulta ${cancelada.id} (${cancelada.pet}) -> ${cancelada.status}`,
);
