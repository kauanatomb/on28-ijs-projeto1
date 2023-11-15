/**
 * ESTRUTURA DOS TESTES
 * setup (o que a minha funcao/metodo/classe que vai ser testada precisa para funcionar?)
 * acao (execusao da funcao testada)
 * verificacao (o que eu espero que seja retornado comparado com o que de fato é retornado)
  
 */
const Conta = require("./Conta");

describe("Testes da Classe Conta", () => {
  test("verificar se instancia foi criada corretamente", () => {
    const conta = new Conta();
    expect(conta instanceof Conta).toBe(true);
    conta.destruirListaContas()
});

  test("instanciar conta com valores validos", () => {
    /**
     * Agencia (4 digitos string) -> privado
     * Conta (5 digitos string)-> privado
     * Saldo (numero positivo) -> privado
     */
    const conta = new Conta("1234", "12345", 1000);
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruirListaContas()
});

  test("retorna mensagem de sucesso ao criar conta", () => {
    const conta = new Conta();
    expect(conta.criarConta("1234", "12345", 1000)).toBe(
      "Conta criada com sucesso"
    );
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruirListaContas()
});

  test("retorna mensagem de erro ao tentar criar conta com dados invalido", () => {
    const conta = new Conta();
    expect(() => conta.criarConta("123454", "123", 1000)).toThrow(
      "Dados inválidos para cadastro"
    ); 
    conta.destruirListaContas()
});

  test("retorna sucesso ao sacar 100 da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);
    conta.sacar(100);
    expect(conta.getSaldo()).toBe(900);
    conta.destruirListaContas()
});

  test("retorna mensagem de erro ao sacar -100 reais da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);
    expect(() => conta.sacar(-100)).toThrow("Valor inválido.");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruirListaContas()
});

  test("retorna mensagem de erro ao sacar valor maior que o saldo da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 100);
    expect(() => conta.sacar(110)).toThrow("Saldo insuficiente");
    expect(conta.getSaldo()).toBe(100);
    conta.destruirListaContas()
});

  test("retorna sucesso ao depositar 100 reais da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);
    conta.depositar(100);
    expect(conta.getSaldo()).toBe(1100);
    conta.destruirListaContas()
});

  test("retorna mensagem de erro ao depositar -100 reais da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);
    expect(() => conta.depositar(-100)).toThrow("Valor inválido.");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruirListaContas()
});

  test("retorna mensagem de erro ao depositar valor não numerico", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);
    expect(() => conta.depositar(" ")).toThrow("Valor inválido.");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruirListaContas()

});

  test("criar uma chave pix por cpf com sucesso", () => {
    //setup
    const conta = new Conta();
    //acao
    const operacao = conta.criarChavePix("40814360879", "CPF");
    //verificacao
    expect(operacao).toBe("Chave Pix por cpf criada com sucesso");
    expect(conta.chavesPix.cpf).toBe("40814360879");
    conta.destruirListaContas()
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com cpf invalido", () => {
    //setup
    const conta = new Conta();
    //verificacao
    expect(() => conta.criarChavePix("124861", "CPF")).toThrow("Erro: CPF inválido");
    conta.destruirListaContas()
});

  test("criar uma chave pix por email com sucesso", () => {
    //setup
    const conta = new Conta();
    //acao
    const operacao = conta.criarChavePix("analu@email.com", "EMAIL");
    //verificacao
    expect(operacao).toBe("Chave Pix por email criada com sucesso");
    expect(conta.chavesPix.email).toBe("analu@email.com");
    conta.destruirListaContas()
  });

  test("criar uma chave pix por telefone com sucesso", () => {
    //setup
    const conta = new Conta();
    //acao
    const operacao = conta.criarChavePix("11951639874", "TELEFONE");
    //verificacao
    expect(operacao).toBe("Chave Pix por telefone criada com sucesso");
    expect(conta.chavesPix.telefone).toBe("11951639874");
    conta.destruirListaContas()
  });

  /**
   * TRANFERENCIA
   * emissor = conta q esta enviando o dinheiro
   * recepto = conta q está recebendo esse dinheiro
   * agencia e conta do receptor
   * metodo vai precisar de valor, agencia do Receptor e conta do Receptor
   * valor valido
   * saldo suficiente
   * dados validos do receptor
   */

  test("retorna sucesso ao fazer uma transferencia com valor válido, saldo suficiente, dados validos", ()=>{
    //setup
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();
    contaEmissor.criarConta("0001", "12345", 1000 )
    contaReceptor.criarConta("0001", "78945", 500 )
    //acao
    const operacao = contaEmissor.transferir(100, "0001", "78945")
    //verificacao
    expect(operacao).toBe("Transferencia realizada")
    expect(contaEmissor.getSaldo()).toBe(900)
    expect(contaReceptor.getSaldo()).toBe(600)
    contaEmissor.destruirListaContas();
    contaReceptor.destruirListaContas();
  })

  test("retorna erro ao fazer uma transferencia com valor válido, saldo suficiente, dados inválidos", () => {
    // setup
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();
    contaEmissor.criarConta("0001", "12345", 1000);
    contaReceptor.criarConta("0001", "78945", 500);

    // acao e verificacao
    expect(() => contaEmissor.transferir(100, "0005", "78945")).toThrow("Conta não encontrada");

    // limpeza
    contaEmissor.destruirListaContas();
    contaReceptor.destruirListaContas();
});


  //test erro chave pix

  test('retorna erro para chave pix de telefone incorreta', () => {
    //setup
    const contaEmissor = new Conta();
    //acao &&
    //verificacao
    expect(() => contaEmissor.criarChavePix('9852117', 'TELEFONE')).toThrow("Erro: TELEFONE inválido")
  })

  test('retorna erro para chave pix de email incorreta', () => {
    //setup
    const contaEmissor = new Conta();
    //acao &&
    //verificacao
    expect(() => contaEmissor.criarChavePix('kauana.tombolato', 'EMAIL')).toThrow("Erro: EMAIL inválido")
  })

  test('retorna erro para chave pix inexistente', () => {
    //setup
    const contaEmissor = new Conta();
    //acao &&
    //verificacao
    expect(() => (contaEmissor.criarChavePix('kauana.tombolato', 'NOME')).toThrow("Tipo de chavePix inválido"))
  })

  // transferencias por pix
  test('retorna sucesso para transferencia por pix', () => {
    //setup
    const conta1 = new Conta("1234", "5678-9", 1000);
    conta1.criarChavePix("11951639874", "TELEFONE");
    const conta2 = new Conta("5678", "1234-5", 1500);
    //acao
    const operacao = conta2.transferenciaPix(200, "11951639874", "telefone")
    console.log(operacao);
    //verificacao
    expect(operacao).toBe("Transferencia realizada")
    expect(conta2.getSaldo()).toBe(1300)
    expect(conta1.getSaldo()).toBe(1200)
    conta1.destruirListaContas();
    conta2.destruirListaContas();
  })

  test('retorna que chave pix não foi encontrada para transferencia por pix', () => {
    //setup
    const conta1 = new Conta("1234", "5678-9", 1000);
    conta1.criarChavePix("11951639874", "TELEFONE");
    const conta2 = new Conta("5678", "1234-5", 1500);
    //acao &&
    //verificacao
    expect(() => (conta2.transferenciaPix(200, "11951639874", "cpf"))).toThrow('Chave pix não encontrada')
    conta1.destruirListaContas();
    conta2.destruirListaContas();
  })

  test('retorna que valor é inválido para transferencia por pix', () => {
    //setup
    const conta1 = new Conta("1234", "5678-9", 1000);
    conta1.criarChavePix("11951639874", "TELEFONE");
    const conta2 = new Conta("5678", "1234-5", 1500);
    //acao &&
    //verificacao
    expect(() => (conta2.transferenciaPix("N", "11951639874", "telefone"))).toThrow('Valor inválido.')
    expect(() => (conta2.transferenciaPix(-20, "11951639874", "telefone"))).toThrow('Valor inválido.')
    conta1.destruirListaContas();
    conta2.destruirListaContas();
  })

  test('retorna que saldo é insuficiente para transferencia por pix', () => {
    //setup
    const conta1 = new Conta("1234", "5678-9", 1000);
    conta1.criarChavePix("11951639874", "TELEFONE");
    const conta2 = new Conta("5678", "1234-5", 15);
    //acao &&
    //verificacao
    expect(() => (conta2.transferenciaPix(200, "11951639874", "telefone"))).toThrow('Saldo insuficiente')
    conta1.destruirListaContas();
    conta2.destruirListaContas();
  })

});
