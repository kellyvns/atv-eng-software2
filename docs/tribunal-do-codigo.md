
# Tribunal do Código — AgendaVet

## Análise do sistema legado

O código original do AgendaVet apresenta problemas de organização,
manutenção e separação de responsabilidades.

### 1. God Class
A classe SistemaAgendamento concentra várias responsabilidades:
agendamento, cálculo de preços, cancelamento e notificações.

### 2. Primitive Obsession
Os dados das consultas são representados por valores primitivos,
sem uma estrutura de domínio adequada.

### 3. Uso excessivo de any
O sistema utiliza any[] para armazenar consultas, eliminando
parte da segurança de tipos oferecida pelo TypeScript.

### 4. Magic Numbers
Os preços 120, 80 e 540 estão diretamente escritos no método,
dificultando alterações e manutenção.

### 5. Long Parameter List
O método agendar recebe muitos parâmetros individuais,
tornando sua utilização e manutenção mais difíceis.

### 6. Tight Coupling
A classe SistemaAgendamento instancia diretamente o ZapLegacySDK,
criando dependência entre o agendamento e a biblioteca antiga.

### 7. Exposição de dados internos
O método listar retorna diretamente o array interno de consultas,
permitindo alterações externas na coleção.

### 8. Múltiplas responsabilidades
O método agendar calcula valores, cria objetos, armazena dados
e envia notificações, acumulando diferentes tarefas.

## Soluções aplicadas

- Separação das responsabilidades em classes.
- Criação de interfaces.
- Utilização dos princípios SOLID.
- Aplicação dos padrões Adapter, Decorator e Facade.
- Organização das regras de preços.
- Criação de um repositório independente.
- Separação das notificações.
