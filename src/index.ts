import { criarApp } from "./app";
import { montarFacade } from "./montagem";

const PORTA = 3000;

criarApp(montarFacade()).listen(PORTA, () =>
  console.log(`AgendaVet em http://localhost:${PORTA}`),
);