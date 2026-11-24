import { TipoAtendimento } from "../domain/TipoAtendimento";

export interface RegraDePreco {
  readonly tipo: TipoAtendimento;
  calcular(): number; 
}