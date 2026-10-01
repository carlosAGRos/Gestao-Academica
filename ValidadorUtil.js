export class ValidadorUtil {
    
   validarCpf(cpf) {
    if (!cpf || typeof cpf !== 'string') return false;
    return cpf.length === 11 && !isNaN(cpf);
  }

  validarEmail(email) {
    if (!email || typeof email !== 'string') return false;
    return email.includes('@');
  }
}