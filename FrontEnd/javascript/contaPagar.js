// Chama a função quando o conteúdo da página for carregado
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
                        <button id='editarContaPagar' onclick="editarContaPagar(${conta.idContasPagar}, '${conta.numero}', '${dataAbertura}', '${dataVencimento}', '${conta.descricao}', ${conta.valor})">Editar</button>
                        <button id='excluirContaPagar' onclick="excluirContaPagar(${conta.idContasPagar})">Excluir</button>
                    </td>
                `;

                // Adicionando a nova linha à tabela
                contasPagarTable.appendChild(row);
            });
    } catch (error) {
        console.error('Erro ao carregar as contas bancárias:', error);
    }
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

// Função para cadastrar a conta a pagar
async function cadastrarContaPagar(event) {
    event.preventDefault(); 

    const nomeConta = document.getElementById("contaPagarNome").value;
    const numeroConta = document.getElementById("contaPagarNumero").value;
    const categoria = document.getElementById("contaPagarCategoria").value;
    const dataAbertura = document.getElementById("DataAberturaConta").value;
    const dataVencimento = document.getElementById("DataVencimentoConta").value;
    const descricao = document.getElementById("contaPagarDescricao").value;
    const valor = parseFloat(document.getElementById("contaPagarValor").value);

    if (!nomeConta || !numeroConta || !dataAbertura || !dataVencimento || !descricao || isNaN(valor) || valor <= 0) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }
    const conta = {
        idContasPagar: 0,
        idCategoriaDocumento: categoria,
        idUsuario: 1,
        numero: numeroConta,
        dataVencimento: dataVencimento,
        dataAbertura:dataAbertura ,
        descricao: descricao,
        valor: valor
     };

    console.log(conta);
    try {
        // Enviando os dados para a API usando fetch
        const response = await fetch('https://localhost:7002/api/ContasPagar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(conta) 
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar a conta a pagar');
        }

        const result = await response.json(); 
        console.log('Conta cadastrada com sucesso:', result);
        document.querySelector(".cadastro-form").reset();

        alert("Conta a pagar cadastrada com sucesso!");
    } catch (error) {
        console.error("Erro ao cadastrar conta:", error);
        alert("Ocorreu um erro ao cadastrar a conta. Tente novamente.");
    }
}
