document.addEventListener('DOMContentLoaded', getContasPagar);

async function getContasPagar() {
    try {
        // Requisição para a API
        const response = await fetch('https://localhost:7002/api/ContasPagar?idUsuario=1');
        const data = await response.json();

        // Limpa a tabela antes de adicionar as novas linhas
        const contasPagarTable = document.querySelector('#conta_pagar tbody');
        contasPagarTable.innerHTML = ''; 

        // Verifique se "contas" é um array e então itere sobre ele
        data.forEach(conta => {
            // Formatar as datas
            const dataAbertura = conta.dataAbertura ? new Date(conta.dataAbertura).toLocaleDateString('pt-BR') : 'Data não disponível';
            const dataVencimento = conta.dataVencimento ? new Date(conta.dataVencimento).toLocaleDateString('pt-BR') : 'Data não disponível';

            // Formatar o valor com 2 casas decimais
            const valor = conta.valor ? conta.valor.toFixed(2).replace('.', ',') : '0,00';

            let saldo = conta.valor || 0;

            // Iterando sobre as movimentações e calculando o saldo
            conta.movimentacoes.forEach(movimentacao => {
                const valorMovimentacao = movimentacao.valor || 0;
                if (movimentacao.idTipoMovimentacao === 1) {
                    // Débito: subtrai do saldo
                    saldo -= valorMovimentacao;
                } else if (movimentacao.idTipoMovimentacao === 2) {
                    // Crédito: soma ao saldo
                    saldo += valorMovimentacao;
                }
            });

            // Formatando o saldo com 2 casas decimais
            const saldoFormatado = saldo.toFixed(2).replace('.', ',');

            // Criando a linha da tabela
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${conta.numero}</td>
                <td>${conta.categoriaDocumento.nome}</td>
                <td>${dataAbertura}</td>
                <td>${dataVencimento}</td>
                <td>${conta.descricao || 'Sem descrição'}</td>
                <td>${valor}</td>
                <td>${saldoFormatado}</td>
                <td>
                    <img src="/img/icon-acoes.png" class="IconMenuAcoes" onclick="toggleSubmenu(event, ${conta.idContasPagar})">
                    <ul class="subMenuAcoes" style="display: none;">
                        <button onclick="lancarMovimentacao(${conta.idContasPagar})">Lançar Movimentação</button>
                        <button id='editarContaPagar' onclick="editarContaPagar(${conta.idContasPagar}, '${conta.numero}', '${dataAbertura}', '${dataVencimento}', '${conta.descricao}', ${conta.valor},${conta.categoriaDocumento.idCategoriaDocumento})">Editar</button>
                        <button id='excluirContaPagar' onclick="excluirContaPagar(${conta.idContasPagar})">Excluir</button>
                    </ul>
                </td>
            `;

            // Adicionando a nova linha à tabela
            contasPagarTable.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar as contas bancárias:', error);
    }
}

// Função para alternar a exibição do submenu
function toggleSubmenu(event, idContasPagar) {
    event.stopPropagation();  // Impede que o clique no submenu feche o submenu imediatamente
    const submenu = event.target.nextElementSibling;  // O próximo elemento após a imagem é o submenu

    // Fecha todos os submenus antes de abrir o submenu clicado
    const allSubmenus = document.querySelectorAll('.submenu');
    allSubmenus.forEach(sub => {
        if (sub !== submenu) {
            sub.style.display = 'none';  // Fecha todos os outros submenus
        }
    });

    // Alterna a visibilidade do submenu clicado
    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
}

async function excluirContaPagar(idContasPagar) {
    alert(`Excluindo conta de ID: ${idContasPagar}`);
    try {
        const url = `https://localhost:7002/api/ContasPagar/${idContasPagar}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const responseText = await response.text();

        if (response.ok) {
            alert('Conta bancária excluída com sucesso!');
            getContasPagar();
        } else {
            try {
                const errorData = JSON.parse(responseText);
                alert('Erro ao excluir conta bancária: ' + (errorData.message || 'Erro desconhecido'));
            } catch (jsonError) {
                alert('Erro ao excluir conta bancária: ' + responseText);
            }
        }
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        alert('Ocorreu um erro ao tentar excluir a conta bancária.');
    }
}
function editarContaPagar(idContasPagar, numero, dataAbertura, dataVencimento, descricao, valor, categoria) {
    // Formatar as datas para o formato correto (YYYY-MM-DD)
    const formatarData = (data) => {
        // Converte de 'DD/MM/YYYY' para 'YYYY-MM-DD'
        const partesData = data.split('/');
        
        if (partesData.length === 3) {
            const dataFormatada = `${partesData[2]}-${partesData[1]}-${partesData[0]}`;
            const date = new Date(dataFormatada);
            return date.toISOString().split('T')[0];  // Formato 'yyyy-MM-dd'
        }
    };

    // Garantir que o valor seja numérico
    const valorFormatado = parseFloat(valor).toFixed(2);  // Garante que o valor tenha 2 casas decimais

    // Salvar os dados da conta no localStorage para edição
    localStorage.setItem('contaPagarId', idContasPagar);
    localStorage.setItem('contaPagarNumero', numero);
    localStorage.setItem('contaPagarDataAbertura', formatarData(dataAbertura));
    localStorage.setItem('contaPagarDataVencimento', formatarData(dataVencimento));
    localStorage.setItem('contaPagarCategoria', categoria); 
    localStorage.setItem('contaPagarDescricao', descricao);
    localStorage.setItem('contaPagarValor', valorFormatado);

    // Redireciona para a página de edição
    window.location.href = '/html/cadastroContaPagar.html';
}

function lancarMovimentacao(idContasPagar){
    localStorage.setItem('contaPagarId', idContasPagar);
    window.location.href = '/html/lancarMovimentacao.html';
}