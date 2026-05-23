# Documentação — AmazonRepasse

Esta pasta contém o **SDD (Software Design Document)** e tudo que define o
produto na sua versão MVP. Toda decisão registrada aqui é considerada
**congelada** para o MVP — alterações exigem nova revisão.

## Índice

| # | Documento                                            | Conteúdo                                                   |
|---|------------------------------------------------------|------------------------------------------------------------|
| 1 | [Visão geral](./01-visao-geral.md)                   | Princípios, escopo final do MVP                            |
| 2 | [Papéis e permissões](./02-papeis-e-permissoes.md)   | Cliente, Administrador, Parceiro — o que cada um pode/não  |
| 3 | [Regras de negócio](./03-regras-de-negocio.md)       | RN001 a RN005 (Lead, Vendidos, Soft Delete, Placa, FIPE)   |
| 4 | [Arquitetura](./04-arquitetura.md)                   | Stack, fluxo, estrutura de pastas                          |
| 5 | [Modelo de dados](./05-modelo-de-dados.md)           | Tabelas e relacionamentos                                  |
| 6 | [Páginas do sistema](./06-paginas-do-sistema.md)     | Rotas públicas, admin e parceiro                           |
| 7 | [Identidade visual](./07-identidade-visual.md)       | Cores, tipografia, logo (em construção)                    |

---

## Como usar

- Quando for **codar uma feature**, leia primeiro a regra de negócio relacionada
  (`03-regras-de-negocio.md`) e o papel envolvido (`02-papeis-e-permissoes.md`).
- Quando for **criar uma tabela ou endpoint**, confira o modelo de dados
  (`05-modelo-de-dados.md`) e a arquitetura (`04-arquitetura.md`).
- Quando for **criar uma página**, confira `06-paginas-do-sistema.md`.
