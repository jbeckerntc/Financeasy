document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o formulário
    const formularioCadastro = document.querySelector('.cadastro-form');

    // Verifica se o formulário existe
    if (formularioCadastro) {
        formularioCadastro.addEventListener('submit', handleFormSubmit);
    }

    // Verifica se estamos editando uma conta
    const contaId = localStorage.getItem('contaId');
    if (contaId) {
        // Se existe 'contaId', estamos editando, então preenchemos o formulário
        preencherFormularioParaEdicao();
    }
});

// Função para preencher o formulário com os dados da conta para edição
function preencherFormularioParaEdicao() {
    const contaNome = localStorage.getItem('contaNome');
    const contaNumero = localStorage.getItem('contaNumero');
    const contaAgencia = localStorage.getItem('contaAgencia');

    // Preenche os campos com os dados da conta
    document.getElementById('contaNome').value = contaNome;
    document.getElementById('contaNumero').value = contaNumero;
    document.getElementById('contaAgencia').value = contaAgencia;

    // Atualiza o título e o texto do botão
    document.querySelector('h2').textContent = 'Editar Conta Bancária';
    document.querySelector('button').textContent = 'Salvar Alterações';
}

// Função para lidar com o envio do formulário
async function handleFormSubmit(event) {
    event.preventDefault();

    const contaNome = document.getElementById('contaNome').value;
    const contaNumero = document.getElementById('contaNumero').value;
    const contaAgencia = document.getElementById('contaAgencia').value;

    if (!contaNome || !contaNumero || !contaAgencia) {
        alert('Todos os campos são obrigatórios!');
        return;
    }

    const dadosConta = {
        idUsuario: 1,  // Substitua pelo ID do usuário logado
        nome: contaNome,
        conta: contaNumero,
        agencia: contaAgencia
    };

    const contaId = localStorage.getItem('contaId');
    if (contaId) {
        // Se estiver editando (contaId existe), chamamos o método de edição
        await editarConta(contaId, dadosConta);
    } else {
        // Se não estiver editando, chamamos o método de cadastro
        await cadastrarConta(dadosConta);
    }
}

// Função para cadastrar a conta bancária
async function cadastrarConta(dadosConta) {
    try {
        const response = await fetch('https://localhost:7002/api/ContaBancaria', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosConta)
        });

        if (response.ok) {
            alert('Conta bancária cadastrada com sucesso!');
            window.location.href = '/html/contaBancaria.html';
        } else {
            const errorData = await response.json();
            alert('Erro ao cadastrar conta bancária: ' + (errorData.message || 'Erro desconhecido'));
        }
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        alert('Ocorreu um erro ao tentar cadastrar a conta bancária.');
    }
}

async function editarConta(contaId, dadosConta) {
    try {
        const dadosAtualizados = {
            ...dadosConta,
            idContaBancaria: contaId // Adiciona o ID da conta ao objeto de dados
        };

        const response = await fetch(`https://localhost:7002/api/ContaBancaria`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosAtualizados) // Envia os dados com o ID da conta
        });

        if (response.ok) {
            alert('Conta bancária atualizada com sucesso!');
            localStorage.removeItem('contaId'); // Limpa os dados de edição
            window.location.href = '/html/contaBancaria.html';
        } else {
            const errorData = await response.json();
            alert('Erro ao editar conta bancária: ' + (errorData.message || 'Erro desconhecido'));
        }
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        alert('Ocorreu um erro ao tentar editar a conta bancária.');
    }
}
