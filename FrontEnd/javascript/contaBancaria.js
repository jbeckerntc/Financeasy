// Função para buscar as contas bancárias da API
async function getContasBancarias() {
    try {
        const response = await fetch('https://localhost:7002/api/ContaBancaria?idUsuario=1');
        const data = await response.json();

        const contasBancariasTable = document.querySelector('#contas_bancarias tbody');
        contasBancariasTable.innerHTML = ''; 

        console.log(data);  

        
        data.$values.forEach(conta => {  
            const row = document.createElement('tr'); 
            row.innerHTML = `
                <td>${conta.nome}</td>
                <td>${conta.agencia}</td>
                <td>${conta.conta}</td>
                <td>
                    <button id='editarConta' onclick="editarConta(${conta.idContaBancaria}, '${conta.nome}', '${conta.conta}', '${conta.agencia}')">Editar</button>
                    <button id='excluirConta' onclick="excluirConta(${conta.idContaBancaria})">Excluir</button>
                </td>
            `;

            contasBancariasTable.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar as contas bancárias:', error);
    }
}

document.addEventListener('DOMContentLoaded', getContasBancarias);

function editarConta(idContaBancaria) {
    alert(`Editar conta de ID: ${idContaBancaria}`);
}

async function excluirConta(idContaBancaria) {
    alert(`Excluindo conta de ID: ${idContaBancaria}`);
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
            getContasBancarias();
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

function editarConta(idContaBancaria, nome, conta, agencia) {
    // Armazena os dados da conta no localStorage
    localStorage.setItem('contaId', idContaBancaria);
    localStorage.setItem('contaNome', nome);
    localStorage.setItem('contaNumero', conta);
    localStorage.setItem('contaAgencia', agencia);
    
    // Redireciona para a página de cadastro
    window.location.href = '/html/cadastroContaBancaria.html';
}
