# AgendaVet

Projeto acadêmico de Engenharia de Software II.

O objetivo é refatorar um sistema de agendamento de uma clínica veterinária, aplicando princípios SOLID, Clean Code e padrões de projeto (Adapter, Decorator e Facade).

## Tecnologias

- TypeScript
- Node.js
- Git e GitHub

## Como executar

Instale as dependências:

```bash
npm install
```

Execute o projeto (agenda as 3 consultas de demonstração):

```bash
npm run dev
```

Para compilar e rodar a versão em JavaScript:

```bash
npm run build
npm start
```

## Estrutura

```
src/
  domain/          Consulta.ts TipoAtendimento.ts
  pricing/         RegraDePreco.ts regras.ts DescontoPlanoPet.ts CalculadoraDePreco.ts
  repositories/    IRepositorioConsultas.ts RepositorioEmMemoria.ts
  notifications/   INotificador.ts ZapAdapter.ts EmailFakeNotificador.ts NotificadorComposto.ts
  facade/          ClinicaFacade.ts
  libs/            zap-legacy-sdk.ts   (biblioteca de terceiros — não alterar)
  legado/          sistema.ts          (fica só para comparação)
  index.ts
```

## Participantes

- Kelly Venâncio dos Santos
