# Kanban API - Arquitetura e Princípios

## Introdução

A Kanban API é uma aplicação que oferece um sistema de persistência de dados para um quadro de Kanban, seguindo as práticas do Domain-Driven Design (DDD). Esta documentação explora as decisões arquiteturais e os princípios utilizados na estruturação da aplicação, bem como as vantagens da utilização do Prisma.

## Princípios de Design

### Separação de Responsabilidades

Um dos principais princípios utilizados na Kanban API é a separação de responsabilidades. A arquitetura da aplicação é dividida em diferentes camadas, cada uma com um propósito específico:

1. **Camada de Transporte:** Responsável por lidar com as requisições HTTP, validações de entrada e retornar respostas apropriadas. Essa camada contém os handlers das rotas.

2. **Camada de Domínio:** Contém a lógica de negócios e as regras do domínio da aplicação. Aqui, definimos as entidades, agregados, objetos de valor e repositórios.

3. **Camada de Dados:** Responsável pelo acesso ao banco de dados e gerenciamento das operações CRUD. Aqui, o Prisma ORM é utilizado para interagir com o PostgreSQL.

### Benefícios da Separação

A separação de responsabilidades traz diversos benefícios:

- **Legibilidade:** Cada camada possui um foco específico, tornando o código mais legível e compreensível.

- **Manutenção:** Mudanças em uma camada não afetam as outras, permitindo a evolução e manutenção da aplicação de forma mais isolada.

- **Testabilidade:** A separação facilita a criação de testes unitários e de integração, uma vez que a lógica está bem encapsulada.

## Estrutura do Projeto

A estrutura do projeto segue os princípios mencionados:

- **src:** Contém os handlers das rotas e lógica de transporte.

- **src/cards:** Contém a implementação relacionada aos cards, incluindo esquema, repositório, serviço e rotas.

- **src/shared:** Contém componentes compartilhados, como middlewares, configurações e tipos.

- **src/shared/middlewares:** Contém middlewares utilizados na validação e autenticação das requisições.

- **src/shared/database:** Contém a configuração do banco de dados e o uso do Prisma ORM.

- **src/shared/routes:** Define as rotas utilizadas pela aplicação.

- **src/shared/schemas:** Define os schemas de banco de dados utilizando o Prisma.

- **src/shared/types:** Contém tipos e interfaces utilizados em diferentes partes da aplicação.

## Vantagens do Prisma

O Prisma é uma escolha poderosa para a camada de dados da aplicação por vários motivos:

- **Abstração do Banco de Dados:** O Prisma oferece uma abstração para as operações de banco de dados, permitindo escrever consultas de forma mais intuitiva.

- **Segurança:** As consultas geradas pelo Prisma são protegidas contra SQL Injection, aumentando a segurança da aplicação.

- **Migrações Automáticas:** O Prisma facilita a migração do esquema do banco de dados à medida que a aplicação evolui, sem a necessidade de escrever scripts complexos.

- **Tipagem Forte:** O Prisma gera tipos TypeScript com base nas definições do esquema do banco de dados, garantindo a integridade dos dados.

- **Desacoplamento:** O Prisma separa o acesso ao banco de dados do restante da aplicação, facilitando mudanças futuras.

## Configuração de Porta

A porta padrão da aplicação foi alterada para 3333 para evitar conflitos com a porta 5000, que é a padrão no macOS. Certifiquei-me de que essa alteração também fosse refletida no código do frontend.

## Testes Não Implementados

Devido a limitações de tempo, não foram implementados testes para a aplicação. Recomenda-se adicionar testes no futuro para garantir a qualidade e a robustez do código.
Certainly! Here's the setup guide translated into Portuguese:

---

## Guia de Configuração do Projeto

### Setup Local

Este guia ajudará você a configurar o projeto kanban no seu computador local usando o Docker. No final desta configuração, você terá a API acessível em `localhost:3333` e o frontend em `localhost:3000`.

### Pré-requisitos

- Docker instalado em sua máquina.
- Docker Compose instalado em sua máquina.

### Passos

1. **Clonar o Repositório**

   ```bash
   git clone [https://github.com/LeoTexx/kanban-board] projeto_kanban
   cd projeto_kanban
   ```

2. **Configurar Variáveis de Ambiente**

   Antes de iniciar os serviços, certifique-se de configurar as variáveis de ambiente necessárias para que o aplicativo funcione corretamente.

   Atualize o arquivo `docker-compose.yml` com os valores apropriados:

   ```yaml
   ...
   api:
     ...
     args:
       - DATABASE_URL=postgres://[SEU_USUARIO_DB]:[SUA_SENHA_DB]@postgres:5432/[NOME_DO_SEU_DB]
       - AUTH_USERNAME=[SEU_NOME_USUARIO_API]
       - AUTH_PASSWORD=[SUA_SENHA_API]
       - JWT_SECRET=[SUA_CHAVE_SECRETA_JWT]
   ...
   ```

3. **Construir e Iniciar os Serviços**

   Execute o seguinte comando:

   ```bash
   docker-compose up --build
   ```

   Isso construirá as imagens Docker para a API e o frontend e, em seguida, iniciará os containers.

4. **Acessar os Serviços**

   - A API estará acessível em: [http://localhost:3333](http://localhost:3333)
   - O Frontend estará acessível em : [http://localhost:3000](http://localhost:3000)

5. **Desligar e Limpar**

   Para parar os serviços, pressione `Ctrl+C` no terminal onde o `docker-compose` está sendo executado.

   Para remover completamente as imagens, containers, redes e volumes construídos, você pode executar:

   ```bash
   docker-compose down --volumes
   ```

## Conclusão

A Kanban API adota princípios de separação de responsabilidades e utiliza o Prisma como uma ferramenta poderosa para acesso ao banco de dados. A estrutura do projeto e a arquitetura escolhida permitem uma aplicação mais modular, testável e escalável, preparada para enfrentar os desafios futuros do desenvolvimento.
