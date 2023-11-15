const ContaStandard = require("./ContaStandard");

describe("Teste da classe ContaStandard", () => {
  test("Verificar se a instância ContaStandard está sendo criada", () => {
    const conta = new ContaStandard();
    expect(conta instanceof ContaStandard).toBe(true);
    conta.destruirListaContas();
  });

  test("Instanciar conta standart com valores válidos", () => {
    const conta = new ContaStandard("1234", "12345", 1000, 3000);
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruirListaContas();
  });

  test("retorna mensagem de sucesso ao criar conta standart", () => {
    const conta = new ContaStandard();

    expect(conta.criarConta("1234", "12345", 1000, 3000)).toBe(
      "Conta criada com sucesso"
    );
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruirListaContas();
  });

  test("retorna mensagem de ERRO ao criar conta Standart", () => {
    const conta = new ContaStandard();
    const operacao = () => conta.criarConta("1234", "345", 1000, 3000);

    expect(operacao).toThrow("Dados inválidos para cadastro");
    conta.destruirListaContas();
  });

  test("retorna mensagem de ERRO ao tentar criar conta Standart com renda incompatível", () => {
    const conta = new ContaStandard();
    const operacao = () => conta.criarConta("1111", "12345", 1000, 6000);

    expect(operacao).toThrow("Renda não compatível com Conta Standart");
    conta.destruirListaContas();
  });

  test("retorna sucesso ao sacar 100 da conta standart", () => {
    const conta = new ContaStandard();
    conta.criarConta("1234", "12345", 1000, 3000);

    conta.sacar(100);
    expect(conta.getSaldo()).toBe(900);
    conta.destruirListaContas();
  });

  test("retorna mensagem de erro ao sacar -100 da conta standart", () => {
    const conta = new ContaStandard();
    conta.criarConta("1234", "12345", 1000, 3000);

    expect(() => conta.sacar(-100)).toThrow("Valor inválido.");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruirListaContas();
  });

  test("retorna mensagem de sucesso ao depositar 100 na conta", () => {
    const conta = new ContaStandard();
    conta.criarConta("1234", "12345", 1000, 3000);

    conta.depositar(100);
    expect(conta.getSaldo()).toBe(1100);
    conta.destruirListaContas();
  });

  test("retona mensagem de erro ao depositar -100 da conta", () => {
    const conta = new ContaStandard();
    conta.criarConta("1234", "12345", 1000, 3000);

    expect(() => conta.depositar(-100)).toThrow("Valor inválido.");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruirListaContas();
  });

  test("retorna mensagem de erro ao depositar valor não numérico da conta", () => {
    const conta = new ContaStandard();
    conta.criarConta("1234", "12345", 1000, 3000);

    expect(() => conta.depositar(" ")).toThrow("Valor inválido.");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruirListaContas();
  });

  test("retorna sucesso ao fazer uma transferência com valor válido, saldo sufuciente, dados válidos", () => {
    const contaEmissor = new ContaStandard();
    const contaReceptor = new ContaStandard();

    contaEmissor.criarConta("1234", "12245", 3000, 4500);
    contaReceptor.criarConta("7894", "45678", 1000, 2500);

    const operacao = contaEmissor.transferir(200, "7894", "45678");

    expect(operacao).toBe("Transferência realizada");
    expect(contaEmissor.getSaldo()).toBe(2800);
    expect(contaReceptor.getSaldo()).toBe(1200);

    contaEmissor.destruirListaContas();
    contaReceptor.destruirListaContas();
  });

  test("retorna mensagem de erro ao tentar fazer uma transferência acima do limite diário", () => {
    const contaEmissor = new ContaStandard();
    const contaReceptor = new ContaStandard();

    contaEmissor.criarConta("1234", "12245", 3000, 4500);
    contaReceptor.criarConta("7894", "45678", 1000, 2500);

    expect(() => contaEmissor.transferir(2500, "7894", "45678")).toThrow("Valor de transferência acima do limite diário");
    expect(contaEmissor.getSaldo()).toBe(3000);
    expect(contaReceptor.getSaldo()).toBe(1000);

    contaEmissor.destruirListaContas();
    contaReceptor.destruirListaContas();
  });

  test("criar chave pix por cpf com sucesso", () => {
    const conta = new ContaStandard();
    const operacao = conta.criarChavePix("12345678978", "CPF");

    expect(operacao).toBe("Chave Pix por cpf criada com sucesso");
    expect(conta.chavesPix.cpf).toBe("12345678978");
    conta.destruirListaContas();
  });

  test("retorna mensagem de erro ao tentar cadastrar chave pix com cpf inválido", () => {
    const conta = new ContaStandard();
    expect(() => conta.criarChavePix("123456", "CPF")).toThrow("Erro: CPF inválido");
    conta.destruirListaContas();
  });

  test("criar chave Pis EMAIL com sucesso", () => {
    const conta = new ContaStandard();
    const operacao = conta.criarChavePix("kauana.tombolato@email.com.br", "EMAIL");

    expect(operacao).toBe("Chave Pix por email criada com sucesso");
    expect(conta.chavesPix.email).toBe("kauana.tombolato@email.com.br");
    conta.destruirListaContas();
  });

  test("retorna mensagem de ERROo ao tentar cadastrar chave Pix EMAIL inválido", () => {
    const conta = new ContaStandard();

    expect(() => conta.criarChavePix("kauana.tombolato@email", "EMAIL")).toThrow(
      "Erro: EMAIL inválido"
    );
    conta.destruirListaContas();
  });

  test("criar chave Pix TELEFONE com sucesso", () => {
    const conta = new ContaStandard();
    const operacao = conta.criarChavePix("(19)997852117", "TELEFONE");

    expect(operacao).toBe("Chave Pix por telefone criada com sucesso");
    expect(conta.chavesPix.telefone).toBe("(19)997852117");
    conta.destruirListaContas();
  });

  test("retornar mensagem de ERRO ao tentar cadastrar chave Pix TELEFONE inválido", () => {
    const conta = new ContaStandard();

    expect(() => conta.criarChavePix("978521", "TELEFONE")).toThrow(
      "Erro: TELEFONE inválido"
    );
    conta.destruirListaContas();
  });

  test("retorna mensagem de ERRo ao tentar cadastrar chave Pix Inexistente", () => {
    const conta = new ContaStandard();

    expect(() => conta.criarChavePix("inexistente", "INEXISTENTE")).toThrow(
      "Tipo de chavePix inválido"
    );
    conta.destruirListaContas();
  });

  test("retorna sucesso ao fazer uma trnasferência via Pix com valor válido, saldo suficiente, dados válidos e limite diário", () => {
    const contaEmissor = new ContaStandard();
    const contaReceptor = new ContaStandard();

    contaEmissor.criarConta("0001", "12345", 1000, 4000);
    contaReceptor.criarConta("1111", "56789", 2000, 3000);

    contaReceptor.criarChavePix("kauana.tombolato@email.com.br", "EMAIL");

    const operacao = contaEmissor.transferenciaPix(
      500,
      "kauana.tombolato@email.com.br",
      "email"
    );

    expect(operacao).toBe("Transferência realizada");
    expect(contaEmissor.getSaldo()).toBe(500);
    expect(contaReceptor.getSaldo()).toBe(2500);
    contaEmissor.destruirListaContas();
    contaReceptor.destruirListaContas();
  });

  test("retorna ERRO ao tentar realizar uma transfereência via Pix com valor acima do limite diário", () => {
    const contaEmissor = new ContaStandard();
    const contaReceptor = new ContaStandard();

    contaEmissor.criarConta("0001", "12345", 2000, 4000);
    contaReceptor.criarConta("1111", "56789", 1000, 3000);

    contaReceptor.criarChavePix("kauana.tombolato@email.com.br", "EMAIL");

    expect(() =>
      contaEmissor.transferenciaPix(1500, "kauana.tombolato@email.com.br", "email")
    ).toThrow("ERRO: Valor acima do limite diário disponível");
    contaEmissor.destruirListaContas();
    contaReceptor.destruirListaContas();
  });

  test("retorna ERRO ao tentar realizar uma transferência via Pix com uma chave não encontrada", () => {
    const contaEmissor = new ContaStandard();
    const contaReceptor = new ContaStandard();

    contaEmissor.criarConta("0001", "12345", 1000, 3000);
    contaReceptor.criarConta("0001", "78945", 500, 2500);

    expect(() =>
      contaEmissor.transferenciaPix(100, "kauana.tombolato@email.com.br", "EMAIL")
    ).toThrow('Tipo pix não encontrado');
    expect(contaEmissor.getSaldo()).toBe(1000);
    expect(contaReceptor.getSaldo()).toBe(500);

    contaEmissor.destruirListaContas();
    contaReceptor.destruirListaContas();
  });

  test("retorna ERRO ao tentar realizar uma transferência via Pix com valor inválido", () => {
    const contaEmissor = new ContaStandard();
    const contaReceptor = new ContaStandard();

    contaEmissor.criarConta("0001", "12345", 1000, 3000);
    contaReceptor.criarConta("0001", "78945", 500, 2500);

    contaReceptor.criarChavePix("12345678977", "CPF");

    expect(() =>
      contaEmissor.transferenciaPix(-100, "12345678977", "cpf")
    ).toThrow("Valor inválido.");
    expect(contaEmissor.getSaldo()).toBe(1000);
    expect(contaReceptor.getSaldo()).toBe(500);
    contaEmissor.destruirListaContas();
    contaReceptor.destruirListaContas();
  });

  test("retorna mensagem de erro ao tentar realizar uma transferência acima do valor disponível no saldo", () => {
    const contaEmissor = new ContaStandard();
    const contaReceptor = new ContaStandard();

    contaEmissor.criarConta("0001", "12345", 500, 3000);
    contaReceptor.criarConta("0001", "78945", 500, 2500);

    contaReceptor.criarChavePix("12345678977", "CPF");

    expect(() => contaEmissor.transferenciaPix(520, "12345678977", "cpf")).toThrow(
      "Saldo insuficiente"
    );
    expect(contaEmissor.getSaldo()).toBe(500);
    expect(contaReceptor.getSaldo()).toBe(500);
    contaEmissor.destruirListaContas();
    contaReceptor.destruirListaContas();
  });
});