import { ValidadorUtil } from "./ValidadorUtil.js";
const validador = new ValidadorUtil();

export class PessoaBase {
    #nome;
    #cpf;
    #email;

    constructor(nome, cpf, email) {
        if (new.target === PessoaBase) {
            throw new Error("ERR_CLASSE_ABSTRATA");
        }
        // Passa pelos setters para que a validação aconteça
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
    }
//--Trim: remove espaços em branco do início e do fim da string, garantindo que o nome não contenha espaços desnecessários.--//
    get nome() { return this.#nome; }
    set nome(valor) {
        if (typeof valor !== 'string' || valor.trim() === '') {
            throw new Error("ERR_NOME_VAZIO");
        }
        this.#nome = valor.trim();
    }

    get cpf() { return this.#cpf; }
    set cpf(valor) {
        if (!validador.validarCpf(valor)) {
            throw new Error("ERR_CPF_INVALIDO");
        }
        this.#cpf = valor;
    }

    get email() { return this.#email; }
    set email(valor) {
        if (!validador.validarEmail(valor)) {
            throw new Error("ERR_EMAIL_INVALIDO");
        }
        this.#email = valor;
    }
}