// Função para buscar as contas bancárias da API
async function getContasBancarias() {
    try {
        const response = await fetch('https://api.exemplo.com/contas-bancarias');
        const data = await response.json();

        const contasBancariasTable = document.querySelector('#contas_bancarias tbody');
        contasBancariasTable.innerHTML = ''; // Limpa as linhas da tabela antes de preencher

        // Preenche a tabela com os dados das contas bancárias
        data.contas.forEach(conta => {
            const row = document.createElement('tr'); // Cria uma nova linha

            // Cria as células da linha (td) e insere os dados
            row.innerHTML = `
                <td>${conta.banco}</td>
                <td>${conta.nome}</td>
                <td>${conta.numero}</td>
                <td>${conta.agencia}</td>
                <td><button onclick="editarConta(${conta.id})">Editar</button> <button onclick="excluirConta(${conta.id})">Excluir</button></td>
            `;

            // Adiciona a linha à tabela
            contasBancariasTable.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar as contas bancárias:', error);
    }
}

// Chama a função para preencher a tabela assim que a página for carregada
document.addEventListener('DOMContentLoaded', getContasBancarias);

// Exemplo de funções de edição e exclusão
function editarConta(id) {
    alert(`Editar conta de ID: ${id}`);
}

function excluirConta(id) {
    alert(`Excluir conta de ID: ${id}`);
}
