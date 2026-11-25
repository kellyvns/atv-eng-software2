import { NovaConsulta } from "../domain/Consulta";
import { TipoAtendimento } from "../domain/TipoAtendimento";

const TAMANHO_MINIMO_TUTOR = 3;
const FORMATO_TELEFONE = /^\d{10,11}$/;
const FORMATO_DATA_ISO =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d{1,3})?)?(Z|[+-]\d{2}:\d{2})?$/;

export type ResultadoValidacao =
  | { valido: true; dados: NovaConsulta }
  | { valido: false; erros: string[] };

export function validarNovaConsulta(corpo: unknown): ResultadoValidacao {
  const entrada = (typeof corpo === "object" && corpo !== null ? corpo : {}) as Record<string, unknown>;
  const erros: string[] = [];

  const { tutor, telefone, pet, tipo, dataHora, planoPetMais } = entrada;

  if (typeof tutor !== "string" || tutor.trim().length < TAMANHO_MINIMO_TUTOR) {
    erros.push(`tutor deve ter pelo menos ${TAMANHO_MINIMO_TUTOR} caracteres.`);
  }
  if (typeof telefone !== "string" || !FORMATO_TELEFONE.test(telefone)) {
    erros.push("telefone deve ter só dígitos, com 10 ou 11 números (DDD incluso).");
  }
  if (typeof pet !== "string" || pet.trim() === "") {
    erros.push("pet é obrigatório.");
  }
  if (!Object.values(TipoAtendimento).includes(tipo as TipoAtendimento)) {
    erros.push(`tipo deve ser um destes: ${Object.values(TipoAtendimento).join(", ")}.`);
  }

  const data = typeof dataHora === "string" && FORMATO_DATA_ISO.test(dataHora)
    ? new Date(dataHora)
    : undefined;
  if (!data || isNaN(data.getTime())) {
    erros.push("dataHora deve estar no formato ISO (ex.: 2027-01-10T14:00:00).");
  } else if (data.getTime() <= Date.now()) {
    erros.push("dataHora deve estar no futuro.");
  }

  if (planoPetMais !== undefined && typeof planoPetMais !== "boolean") {
    erros.push("planoPetMais deve ser true ou false.");
  }

  if (erros.length > 0) return { valido: false, erros };

  return {
    valido: true,
    dados: {
      tutor: (tutor as string).trim(),
      telefone: telefone as string,
      pet: (pet as string).trim(),
      tipo: tipo as TipoAtendimento,
      dataHora: data as Date,
      planoPetMais: planoPetMais === true,
    },
  };
}