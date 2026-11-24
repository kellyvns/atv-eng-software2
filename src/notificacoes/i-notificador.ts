
import { Consulta } from "../dominio/consulta";

export interface INotificador {
  enviar(consulta: Consulta): void;
}
