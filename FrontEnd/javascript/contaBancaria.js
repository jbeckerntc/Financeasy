// Função para buscar as contas bancárias da API
async function getContasBancarias() {
    try {
        const response = await fetch('https://localhost:7002/api/ContaBancaria?idUsuario=1');
        const data = await response.json();

        const contasBancariasTable = document.querySelector('#contas_bancarias tbody');
        contasBancariasTable.innerHTML = '';  // Limpar a tabela antes de preenchê-la

        console.log(data);

        data.$values.forEach(conta => {  
            const row = document.createElement('tr'); 
            row.innerHTML = `
                <td>${conta.nome}</td>
                <td>${conta.agencia}</td>
                <td>${conta.conta}</td>
                <td>
                    <img src="/img/icon-acoes.png" class="IconMenuAcoes" onclick="toggleSubmenu(event, ${conta.idContaBancaria})">
                    <ul class="subMenuAcoes" style="display: none;">
                        <button onclick="verExtrato(${conta.idContaBancaria}, '${conta.nome}')">Ver Extrato</button>
                        <button onclick="editarConta(${conta.idContaBancaria}, '${conta.nome}', '${conta.conta}', '${conta.agencia}')">Editar</button>
                        <button onclick="excluirConta(${conta.idContaBancaria})">Excluir</button>
                    </ul>
                </td>
            `;
            contasBancariasTable.appendChild(row);  // Adicionar a linha à tabela
        });
    } catch (error) {
        console.error('Erro ao carregar as contas bancárias:', error);
    }
}

document.addEventListener('DOMContentLoaded', getContasBancarias);

// Função para alternar a exibição do submenu
function toggleSubmenu(event, idContaBancaria) {
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

// Função para ver o extrato bancário
function verExtrato(idContaBancaria, nome) {
    // Redireciona para a página de extrato bancário
    window.location.href = '/html/extratoBancario.html';  // Certifique-se de que essa página existe
}

// Função para editar a conta bancária
function editarConta(idContaBancaria, nome, conta, agencia) {
    // Salvar os dados da conta no localStorage para edição
    localStorage.setItem('contaId', idContaBancaria);
    localStorage.setItem('contaNome', nome);
    localStorage.setItem('contaNumero', conta);
    localStorage.setItem('contaAgencia', agencia);

    // Redireciona para a página de edição
    window.location.href = '/html/cadastroContaBancaria.html';
}

// Função para excluir a conta bancária
async function excluirConta(idContaBancaria) {
    if (confirm("Tem certeza que deseja excluir esta conta bancária?")) {
        try {
            const url = `https://localhost:7002/api/ContaBancaria?idContaBancaria=${idContaBancaria}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const responseText = await response.text();

            if (response.ok) {
                alert('Conta bancária excluída com sucesso!');
                getContasBancarias();  // Atualizar a lista de contas
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
}
