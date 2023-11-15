class Conta{
    #agencia;
    #conta;
    #saldo;
    chavesPix;
    static listaContas = [];

    constructor(agencia, conta, saldo){
        this.#agencia = agencia;
        this.#conta = conta;
        this.#saldo = saldo;
        this.chavesPix = {
            cpf: undefined,
            email: undefined,
            telefone: undefined
        };

        Conta.listaContas.push(this)
    }

    destruirListaContas(){
        let i = Conta.listaContas.indexOf(this);
        Conta.listaContas.splice(i, 1)
    }

    criarConta(agencia, conta, saldo){
        if(agencia.length === 4 && conta.length === 5 && saldo > 0){
            this.#agencia = agencia;
            this.#conta = conta;
            this.#saldo = saldo;
        
            return "Conta criada com sucesso";
        } else {
            throw new Error("Dados inválidos para cadastro");
        }
    }

    verificaValor(valor) {
        if (typeof valor === "number" && valor > 0) {
            return valor
        } else {
            throw new Error("Valor inválido.");
        }
    }

    verificaSaldo(valor) {
        if (this.#saldo - valor >= 0) {
            return valor
        } else {
            throw new Error("Saldo insuficiente para esta operação.");
        }
    }
    
    verificaConta(agencia, conta) {
        const contaReceptora = Conta.listaContas.find(contaReceptora => {
            return contaReceptora.getConta() === conta && contaReceptora.getAgencia() === agencia;
        });
        if (!contaReceptora) {
            throw new Error("Conta não encontrada");
        }

        return contaReceptora;
    }
    

    sacar(valor) {
        try {
            this.verificaValor(valor);
            this.verificaSaldo(valor)
            const saldoAtualizado = this.#saldo - valor;
            this.setSaldo(saldoAtualizado);
        } catch (error) {
            throw error;
        }
    }
    
    depositar(valor){
        try {
            this.verificaValor(valor);
            const saldoAtualizado = this.#saldo + valor;
            this.setSaldo(saldoAtualizado)
        } catch (error) {
            throw error;
        }
    }


    transferir(valor, agencia, conta){
        try {
            let contaReceptora = this.verificaConta(agencia, conta)
            this.verificaValor(valor);
            this.verificaSaldo(valor)

            const saldoAtualizado = this.#saldo - valor;
            this.setSaldo(saldoAtualizado);
            const saldoContaReceptora = contaReceptora.getSaldo() + valor
            contaReceptora.setSaldo(saldoContaReceptora);
            return "Transferencia realizada"
        } catch (error) {
            throw error;
        }
    }

    
    criarChavePix(chavePix, tipo) {
        const regexMap = {
            CPF: /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/,
            EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            TELEFONE: /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
        };
        
        if (!regexMap[tipo]) {
            throw new Error("Tipo de chavePix inválido");
        }
        
        if (regexMap[tipo].test(chavePix)) {
            this.chavesPix[tipo.toLowerCase()] = chavePix;
            return `Chave Pix por ${tipo.toLowerCase()} criada com sucesso`;
        } else {
            throw new Error(`Erro: ${tipo} inválido`);
        }
    }
    
    transferenciaPix(valor, chavePix, tipo) {
        const tiposPix = ['email', 'telefone', 'cpf']
        
        const tipoEncontrado = tiposPix.find(tipoPix => tipoPix === tipo);
        if (!tipoEncontrado) {
            throw new Error('Tipo pix não encontrado');
        }
        
        const contaSelecionada = Conta.listaContas.find(conta => {
            return conta.chavesPix[tipo] === chavePix;
        });
        if (!contaSelecionada) {
            throw new Error('Chave pix não encontrada');
        }

        try {
            this.verificaValor(valor);
            this.verificaSaldo(valor)
            const saldoAtualizado = this.#saldo - valor;
            this.setSaldo(saldoAtualizado);
            const saldoContaReceptora = contaSelecionada.#saldo + valor
            contaSelecionada.setSaldo(saldoContaReceptora);
            return "Transferencia realizada"
        } catch (error) {
            throw error;
        }
    }

    getAgencia(){
        return this.#agencia;
    }

    getConta(){
        return this.#conta;
    }

    getSaldo(){
        return this.#saldo;
    }

    setSaldo(novoSaldo){
        this.#saldo = novoSaldo;
    }
}

module.exports = Conta