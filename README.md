<div align="center">

# 🎓 Sistema de Gestão Acadêmica

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![ES Modules](https://img.shields.io/badge/JavaScript-ES_Modules-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)

*Aplicação CLI interativa em Node.js desenvolvida com os pilares da Programação Orientada a Objetos (POO) e validações robustas de domínio.*

</div>

---

## 📌 Sumário

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Pilares de POO Aplicados](#-pilares-de-poo-aplicados)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Regras de Negócio](#-regras-de-negócio)
- [Como Executar](#-como-executar)
- [Tabela de Erros do Sistema](#-tabela-de-erros-do-sistema)
- [Licença](#-licença)

---

## 🎯 Visão Geral

O **Sistema de Gestão Acadêmica** é um software em linha de comando (CLI) voltado para a administração centralizada de alunos e professores. O sistema garante a integridade dos dados cadastrados através de encapsulamento, tratamento de erros customizado e validações em tempo de execução.

---

## ✨ Funcionalidades

- **👨‍🎓 Matrícula de Alunos:** Cadastro de estudantes com controle de idade (14 a 120 anos) e definição automática do status inicial (`ATIVA`).
- **👨‍🏫 Registro de Docentes:** Cadastro de professores com validação de piso salarial mínimo (R$ 1.500,00) e atribuição de titulação (`ESPECIALISTA`, `MESTRE`, `DOUTOR`).
- **🔍 Consulta Unificada por CPF:** Busca ágil no acervo de cadastros utilizando desestruturação e identificação dinâmica do tipo de entidade via `instanceof`.
- **🛡️ Tratamento Centralizado de Exceções:** Captura de erros com bloco `try/catch/finally` e tradução para mensagens explicativas de interface.

---

## 🏛️ Pilares de POO Aplicados

```
  ┌─────────────────────────────────────────────────────────┐
  │                       PessoaBase                        │
  │                  (Classe Abstrata)                      │
  └────────────────────────────┬────────────────────────────┘
                               │
               ┌───────────────┴───────────────┐
               ▼                               ▼
       ┌───────────────┐               ┌───────────────┐
       │     Aluno     │               │   Professor   │
       └───────────────┘               └───────────────┘
```

| Pilar | Aplicação Prática no Projeto |
| :--- | :--- |
| **Abstração** | A classe `PessoaBase` impede a instanciação direta (`new.target === PessoaBase`), atuando estritamente como classe base. |
| **Herança** | Subclasses `Aluno` e `Professor` estendem `PessoaBase`, herdando validações comuns de nome, CPF e e-mail. |
| **Encapsulamento** | Atributos privados nativos (`#nome`, `#cpf`, `#email`, `#idade`, `#salario`) acessados e modificados via *getters* e *setters*. |
| **Enumeração (Enums)** | Uso de `Object.freeze` em `StatusMatriculaEnum` e `StatusTitulacaoEnum` para proibir modificações acidentais nos tipos de domínio. |

---

## 📂 Estrutura do Projeto

```text
gestao-academica/
├── Aluno.js            # Subclasse de Aluno com atributos privados e validações
├── Dominio.js          # Enums imutáveis (StatusMatricula e StatusTitulacao)
├── GestorAcademico.js  # Gerenciador dos arrays de dados e controle de exceções
├── PessoaBase.js       # Classe abstrata base com validação de nome, CPF e e-mail
├── Professor.js        # Subclasse de Professor com verificação de piso salarial
├── ValidadorUtil.js    # Módulo utilitário com regras auxiliares para CPF e E-mail
├── index.js            # Ponto de entrada (CLI) e menu interativo com readline
└── package.json        # Configuração do projeto Node.js (type: module)
```

---

## 📏 Regras de Negócio

| Entidade | Campo / Regra | Condição de Aceite |
| :--- | :--- | :--- |
| **PessoaBase** | Nome | Obrigatório; não pode conter apenas espaços em branco (`trim`). |
| **PessoaBase** | CPF | Deve possuir exatamente 11 caracteres numéricos. |
| **PessoaBase** | E-mail | Deve conter o caractere `@` e formato textual válido. |
| **Aluno** | Idade | Deve ser um valor numérico entre **14** e **120** anos. |
| **Professor** | Salário | Valor numérico maior ou igual ao piso salarial de **R$ 1.500,00**. |

---

## 🚀 Como Executar

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina (versão **18.0.0** ou superior).

### Passo a Passo

1. **Acesse o diretório do projeto no terminal:**
   ```bash
   cd gestao-academica
   ```

2. **Execute a aplicação:**
   ```bash
   node index.js
   ```

3. **Interaja com o menu CLI:**
   ```text
   ====== SISTEMA ACADÊMICO ======

   Escolha a opção desejada:
   1 - Matricular Aluno
   2 - Contratar Professor
   3 - Buscar Cadastro (por CPF)
   4 - Sair do Sistema
   ```

---

## ⚠️ Tabela de Erros do Sistema

Mapeamento dos códigos de exceção tratados na classe `GestorAcademico`:

| Código do Erro | Descrição da Falha |
| :--- | :--- |
| `ERR_CLASSE_ABSTRATA` | Tentativa de instanciar diretamente a classe base `PessoaBase`. |
| `ERR_NOME_VAZIO` | Nome não informado ou preenchido apenas com espaços. |
| `ERR_CPF_INVALIDO` | Formato do CPF diferente de 11 dígitos numéricos. |
| `ERR_EMAIL_INVALIDO` | Endereço de e-mail sem o caractere `@` ou inválido. |
| `ERR_IDADE_MINIMA` | Idade do aluno fora da faixa permitida (14 a 120 anos). |
| `ERR_SALARIO_BASE` | Salário do docente informado abaixo do piso de R$ 1.500,00. |

---

## 📄 Licença

Este projeto está sob a licença **ISC**.