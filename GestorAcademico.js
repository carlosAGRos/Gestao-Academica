import { Aluno } from "./Aluno.js";
import { Professor } from "./Professor.js";

export class GestorAcademico {
    constructor() {
//--arrays para armazenar os alunos e professores cadastrados no sistema, permitindo que o GestorAcademico gerencie e acesse facilmente essas informações.--//
        this.alunos = [];
        this.professores = [];
    }

    cadastrarAluno(nome,cpf,email,idade, curso) {
    try {
        console.log(`\n[SISTEMA ACADÊMICO] Iniciando processo de cadastro...`);

        const aluno = new Aluno(nome, cpf, email, idade, curso);
        this.alunos.push(aluno);
        console.log(`[SISTEMA ACADÊMICO] Aluno ${aluno.nome} foi cadastrado com sucesso!`);
    }
    catch (erroCapturado) {
        console.log(`[SISTEMA ACADÊMICO] Erro ao cadastrar aluno: ${erroCapturado.message}`);
        this.traduzirErroParaOCliente(erroCapturado.message);
    }
    finally {
        console.log("[SISTEMA ACADÊMICO] Processo de cadastro finalizado.");
    }
}

    cadastrarProfessor(nome, cpf, email, salario, titulacao) {
    try {
        console.log(`\n[SISTEMA ACADÊMICO] Iniciando registro de professor...`)
//--Push adiciona o professor ao array de professores, permitindo que o sistema mantenha um registro de todos os professores cadastrados.--//
        const professor = new Professor(nome, cpf, email,salario, titulacao);
        this.professores.push(professor);
        console.log(`[SISTEMA ACADÊMICO] Registro de Professor: ${professor.nome} executado com sucesso!`);

    }
    catch (erroCapturado) {
        console.log(`[SISTEMA ACADÊMICO] Erro na tentativa de registro do professor: ${erroCapturado.message}`);
        this.traduzirErroParaOCliente(erroCapturado.message);
    }
    finally {
        console.log("[SISTEMA ACADÊMICO] Processo de registro de professor finalizado.");
    }
}
//--Find: busca o primeiro elemento que satisfaça a condição especificada, permite localizar um aluno ou professor pelo CPF.--//
     buscarPorCpf(cpf) {
        const pessoa = [...this.alunos, ...this.professores].find((p) => p.cpf === cpf);

        if (!pessoa) {
            console.log("\n[SISTEMA ACADÊMICO] Nenhum cadastro encontrado para o CPF informado.");
            return;
        }

        console.log("\n--- CADASTRO ENCONTRADO ---");
        console.log(`Nome: ${pessoa.nome}`);
        console.log(`CPF: ${pessoa.cpf}`);
        console.log(`E-mail: ${pessoa.email}`);
//--instanceof verifica se o objeto é uma instância de uma determinada classe, permite diferenciar Aluno e Professor.--//
        if (pessoa instanceof Aluno) {
            console.log(`Idade: ${pessoa.idade} | Curso: ${pessoa.curso} | Status: ${pessoa.statusAtual}`);
        } else {
            console.log(`Salário: R$ ${pessoa.salario.toFixed(2)} | Titulação: ${pessoa.titulacao}`);
        }
    }

    traduzirErroParaOCliente(codigoErro) {
        switch (codigoErro) {
            case "ERR_CLASSE_ABSTRATA":
                console.log("AVISO: Não é possível cadastrar uma Pessoa genérica no sistema.")
                break;

            case "ERR_NOME_VAZIO":
                console.log("AVISO: O campo de nome é obrigatório e não pode ficar em branco.")
                break;
            
            case "ERR_CPF_INVALIDO":
                console.log("AVISO: O cpf informado é inválido. Digite exatamente 11 números sem formatação.")
                break;

            case "ERR_EMAIL_INVALIDO":
                console.log("AVISO: O endereço de email deve conter um formato válido (ex: nome@dominio.com).")
                break;

            case "ERR_IDADE_MINIMA":
                console.log("AVISO: O aluno deve ter no mínimo 14 anos de idade para efetuar a matrícula no SENAI.")
                break;
            
            case "ERR_SALARIO_BASE":
                console.log("AVISO: O salário registrado não pode ser inferior ao piso da categoria (R$ 1.500,00).")
                break;

            default:
                console.log("AVISO SISTÊMICO: Falha no processamento dos dados. Tente novamente.");
                break;
        }
    }
}