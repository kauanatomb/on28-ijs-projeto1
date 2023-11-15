const Conta = require("../Conta/Conta");

class ContaStandard extends Conta {
  constructor(agencia, conta, saldo, renda){
    super(agencia, conta, saldo);
    this.limiteTransacional = 1000
    this.renda = renda
  }

  criarConta(agencia, conta, saldo, renda) {
    if (renda <= 4999.99) {
      super.criarConta(agencia, conta, saldo);
      return "Conta criada com sucesso";
    } else {
      throw new Error("Renda não compatível com Conta Standart");
    }
  }

  depositar(valor) {
    super.depositar(valor)
  }

  sacar(valor){
    super.sacar(valor)
  }

  transferir(valor, agencia, conta) {
    if (valor > 0 && valor <= this.limiteTransacional) {
      super.transferir(valor, agencia, conta);
      return "Transferência realizada";
    } else {
      throw new Error("Valor de transferência acima do limite diário");
    }
  }

  transferenciaPix(valor, chavePix, tipo) {
    if (valor > this.limiteTransacional) {
      throw new Error("ERRO: Valor acima do limite diário disponível");
    }
    super.transferenciaPix(valor, chavePix, tipo);
    return "Transferência realizada";
  }
}


module.exports = ContaStandard;