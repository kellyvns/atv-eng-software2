
import { TipoConsulta } from "./dominio/consulta";

import { CalculadoraPreco } from "./dominio/calculadora-preco";

import {
  PrecoConsulta,
  PrecoVacina,
  PrecoCirurgia,
  PrecoBanhoTosa
} from "./dominio/regras";

import { RepositorioEmMemoria } from "./repositorios/repositorio-em-memoria";

import { ZapLegacySDK } from "./libs/zap-legacy-sdk";

import { ZapAdapter } from "./notificacoes/zap-adapter";

import { EmailFakeNotificador } from "./notificacoes/email-fake-notificador";

import { NotificadorComEmail } from "./notificacoes/notificador-com-email";

import { ClinicaFacade } from "./fachada/clinica-facade";

// Regras de preços
const regras = {
  CONSULTA: new PrecoConsulta(),
  VACINA: new PrecoVacina(),
  CIRURGIA: new PrecoCirurgia(),
  BANHO_TOSA: new PrecoBanhoTosa()
};

// Instâncias principais
const calculadora = new CalculadoraPreco(regras);

const repositorio = new RepositorioEmMemoria();

// Integração com biblioteca antiga
const zap = new ZapLegacySDK();
const zapAdapter = new ZapAdapter(zap);

// Notificações
const email = new EmailFakeNotificador();

const notificador = new NotificadorComEmail(
  zapAdapter,
  email
);

// Fachada
const clinica = new ClinicaFacade(
  repositorio,
  calculadora,
  notificador
);

// Exemplo de agendamento
const consulta = clinica.agendar({
  tutor: "Maria",
  telefone: "11999999999",
  pet: "Rex",
  tipo: "CONSULTA" as TipoConsulta,
  dataHora: "2026-11-25 14:00",
  planoPetMais: true
});

console.log("\n--- CONSULTA CADASTRADA ---");
console.log(consulta);

console.log("\n--- LISTAGEM DE CONSULTAS ---");
console.log(clinica.listar());

console.log("\n--- CANCELAMENTO ---");
console.log("Cancelamento realizado:", clinica.cancelar(consulta.id));

console.log("\n--- STATUS FINAL ---");
console.log(consulta.getStatus());

