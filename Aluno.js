import { PessoaBase } from "./PessoaBase.js";
import { StatusMatriculaEnum } from "./Dominio.js";
export class Aluno extends PessoaBase {
    #idade;

    constructor(nome, cpf, email,idade, curso) {
        super(nome, cpf, email);
        this.#idade = idade;
        this.curso = curso;
        this.statusAtual = StatusMatriculaEnum.ATIVA;
    }

    get idade() {return this.#idade;}

    set idade(idade) {
         if (typeof idade !== 'number' || isNaN(idade)) {
            throw new Error("ERR_TIPO_IDADE_INVALIDO");
        }
        if (idade < 14 || idade > 120) {
            throw new Error("ERR_IDADE_MINIMA");
        }
        this.#idade = idade;
    }

}
