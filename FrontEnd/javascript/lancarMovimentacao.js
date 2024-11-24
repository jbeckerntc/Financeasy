// Função para buscar o ID da Conta Pagar armazenado no localStorage
const contaPagarId = localStorage.getItem('contaPagarId');
const contaValor = localStorage.getItem('valorFormatado');
console.log(contaValor);

// Função para fazer a requisição à API e popular a tabela com as movimentações
async function popularTabelaMovimentacoes() {
    // Realiza a requisição para obter as contas a pagar
    try {
        const response = await fetch('https://localhost:7002/api/ContasPagar?idUsuario=1');
        
        // Verifica se a requisição foi bem-sucedida
        if (!response.ok) {
            throw new Error('Falha ao carregar dados da API');
        }

        // Converte a resposta em JSON
        const dadosContasPagar = await response.json();

        // Filtra as contas para encontrar o ID armazenado no localStorage
        const contaPagar = dadosContasPagar.find(conta => conta.idContasPagar == contaPagarId);

        if (contaPagar && contaPagar.movimentacoes.length > 0) {
            // Acessa o tbody da tabela onde vamos inserir as movimentações
            const tabela = document.getElementById('tabelaLancamentoConta').getElementsByTagName('tbody')[0];
            
            // Limpa a tabela antes de adicionar as novas linhas
            tabela.innerHTML = '';

            // Itera sobre as movimentações e adiciona à tabela
            contaPagar.movimentacoes.forEach(movimentacao => {
                const novaLinha = tabela.insertRow();

                // Adiciona as colunas à nova linha
                const colValor = novaLinha.insertCell(0);
                const colData = novaLinha.insertCell(1);
                const colTipo = novaLinha.insertCell(2);
                const colDescricao = novaLinha.insertCell(3);

                // Formatar o valor: se for débito (1), verde; se for crédito (2), vermelho
                let valor = movimentacao.valor;
                let cor = 'green'; // Débito por padrão
                let tipoMovimentacao = 'Débito';

                if (movimentacao.idTipoMovimentacao === 2) {
                    // Crédito
                    valor = -valor; // Para exibir o valor como negativo
                    cor = 'red'; // Cor vermelha para crédito
                    tipoMovimentacao = 'Crédito';
                }

                // Definir os valores das células
                colValor.textContent = `R$ ${Math.abs(valor).toFixed(2)}`; // Usamos Math.abs para garantir que o valor seja positivo no formato
                colValor.style.color = cor; // Estilo para cor do valor

                // Preenche as outras colunas com os dados da movimentação
                colData.textContent = new Date(movimentacao.dataMovimentacao).toLocaleDateString();
                colTipo.textContent = tipoMovimentacao;
                colDescricao.textContent = movimentacao.descricao;
            });
        }
    } catch (error) {
        console.error('Erro ao carregar as movimentações:', error);
        alert('Ocorreu um erro ao carregar as movimentações. Tente novamente mais tarde.');
    }
}

// Chama a função para popular a tabela ao carregar a página
popularTabelaMovimentacoes();


// Função para enviar os dados do formulário para a API
async function lancarMovimentacao(event) {
    event.preventDefault(); // Evitar o envio tradicional do formulário

    // Capturar os dados do formulário
    const idContasPagar = contaPagarId
    const valorDaConta = contaValor
    const valor = document.getElementById('valorLancamentoConta').value;
    const data = document.getElementById('dataLancamentoConta').value;
    const tipo = document.getElementById('tipoLancamentoConta').value;
    const descricao = document.getElementById('descricaoLancamentoConta').value;

    if(valorDaConta < valor){
        console.log(valorDaConta);
        console.log(valor);
        alert('Valor lançado maior que o valor da conta');
    }
    else{
    // Criar o objeto de dados a ser enviado para a API
    const movimentacao = {
        idMovimentacaoContaPagar: 0,
        idContaPagar: idContasPagar,
        valor: parseFloat(valor), // Converter para número
        dataLancamento: data,
        idTipoMovimentacao: parseInt(tipo), // Converter para número
        descricao: descricao
    };

    try {
        // Realizar o POST para a API
        const response = await fetch('https://localhost:7002/api/MovimentacaoContaPagar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movimentacao)
        });
        console.log(movimentacao)

        if (response.ok) {
            // Se o POST foi bem-sucedido, atualizar a tabela
            alert('Movimentação lançada com sucesso!');
            popularTabelaMovimentacoes()
        } else {
            throw new Error('Erro ao lançar movimentação');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao tentar lançar a movimentação.');
    }
}
}

