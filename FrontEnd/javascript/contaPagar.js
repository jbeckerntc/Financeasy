async function getContasPagar() {
    try {
        // Requisição para a API
        const response = await fetch('https://localhost:7002/api/ContasPagar?idUsuario=1');
        const data = await response.json();

        // Limpa a tabela antes de adicionar as novas linhas
        const contasPagarTable = document.querySelector('#conta_pagar tbody');
        contasPagarTable.innerHTML = ''; 

        // Verifique se "contas" é um array e então itere sobre ele
            data.$values.forEach(conta => {
                // Formatar as datas
                const dataAbertura = conta.dataAbertura ? new Date(conta.dataAbertura).toLocaleDateString('pt-BR') : 'Data não disponível';
                const dataVencimento = conta.dataVencimento ? new Date(conta.dataVencimento).toLocaleDateString('pt-BR') : 'Data não disponível';

                // Formatar o valor com 2 casas decimais
                const valor = conta.valor ? conta.valor.toFixed(2).replace('.', ',') : '0,00';


                // Criando a linha da tabela
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${conta.numero}</td>
                    <td>${conta.categoriaDocumento.nome}</td>
                    <td>${dataAbertura}</td>
                    <td>${dataVencimento}</td>
                    <td>${conta.descricao || 'Sem descrição'}</td>
                    <td>${valor}</td>
                    <td>
                        <button id='editarContaPagar' onclick="editarConta(${conta.idContasPagar}, '${conta.numero}', '${dataAbertura}', '${dataVencimento}', '${conta.descricao}', ${conta.valor})">Editar</button>
                        <button id='excluirContaPagar' onclick="excluirConta(${conta.idContasPagar})">Excluir</button>
                    </td>
                `;

                // Adicionando a nova linha à tabela
                contasPagarTable.appendChild(row);
            });
    } catch (error) {
        console.error('Erro ao carregar as contas bancárias:', error);
    }
}

// Chama a função quando o conteúdo da página for carregado
document.addEventListener('DOMContentLoaded', getContasPagar);
