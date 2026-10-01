import * as readline from 'node:readline/promises'; 
import { stdin as input, stdout as output } from 'node:process';
import { GestorAcademico } from './GestorAcademico.js';
import { StatusTitulacaoEnum } from './Dominio.js';
const rl = readline.createInterface({ input, output });

(async function iniciarSistema(){

const gestor = new GestorAcademico();
let sistemaCadastro = true;
//while: cria um loop que continua executando enquanto a condição for verdadeira, permite que o usuário interaja com o sistema até decidir sair.--//
while (sistemaCadastro) {
    console.log("====== SISTEMA ACADÊMICO ======");
    console.log("\nEscolha a opção desejada:");
    console.log("1 - Matricular Aluno");
    console.log("2 - Contratar Professor");
    console.log("3 - Buscar Cadastro (por CPF)");
    console.log("4 - Sair do Sistema");
    const opcaoCadastro = (await rl.question("Digite a opção: ")).trim();

    switch (opcaoCadastro) {
    case"1":
        const nome = await rl.question("Digite o nome: ");
        const cpf = (await rl.question("Digite o CPF: ")).trim();
        const email = (await rl.question("Digite o email: ")).trim();
        const idade = parseInt(await rl.question("Digite a idade: "));
        const curso = await rl.question("Digite o curso: ");

        gestor.cadastrarAluno(nome, cpf, email, idade, curso);
        break;
    case"2":
        const nomeProfessor = await rl.question("Digite o nome: ");
        const cpfProfessor = (await rl.question("Digite o CPF: ")).trim();
        const emailProfessor = (await rl.question("Digite o email: ")).trim();
        const salario = parseFloat(await rl.question("Digite o salário: "));
        const opcaoTitulacao = (await rl.question("Titulação (1 - ESPECIALISTA, 2 - MESTRE, 3 - DOUTOR): ")).trim();

        let titulacoes = {
            "1": StatusTitulacaoEnum.ESPECIALISTA,
            "2": StatusTitulacaoEnum.MESTRE,
            "3": StatusTitulacaoEnum.DOUTOR
        };
        const titulacao = titulacoes[opcaoTitulacao];

        if (!titulacao) {
            console.log("AVISO: Opção inválida. Por favor, escolha uma das opções válidas (1, 2 ou 3).");
        }
        gestor.cadastrarProfessor(nomeProfessor, cpfProfessor, emailProfessor, salario, titulacao);
        break;
    case"3":
        const cpfBusca = (await rl.question("Digite o CPF para busca: ")).trim();
        gestor.buscarPorCpf(cpfBusca);
        break;
    case"4":
        console.log("Saindo do sistema...");
        sistemaCadastro = false;
        break;

    default:
        console.log("Opção inválida. Por favor, escolha uma opção válida.");
    }
}   
    rl.close();
})();   
