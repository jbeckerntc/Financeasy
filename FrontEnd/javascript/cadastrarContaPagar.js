document.addEventListener('DOMContentLoaded', () => {
    // Verifica se estamos editando uma conta a pagar
    const contaPagarId = localStorage.getItem('contaPagarId');
    if (contaPagarId) {
        // Se existe 'contaPagarId', estamos editando, então preenchemos o formulário
        preencherFormularioParaEdicao();
    } else {
        // Se não estivermos editando, adicionamos o evento de cadastro
        const formularioCadastro = document.querySelector('.cadastro-form');
        if (formularioCadastro) {
            formularioCadastro.addEventListener('submit', handleFormSubmit);
        }
    }
});

// Função para preencher o formulário com os dados da conta para edição
function preencherFormularioParaEdicao() {
    // Preenche os campos com os dados da conta armazenados no localStorage
    document.getElementById('contaPagarCategoria').value = localStorage.getItem('contaPagarCategoria');
    document.getElementById('DataVencimentoConta').value = localStorage.getItem('contaPagarDataVencimento');
    document.getElementById('contaPagarDescricao').value = localStorage.getItem('contaPagarDescricao');


    // Atualiza o título e o texto do botão
    document.querySelector('h2').textContent = 'Editar Conta a Pagar';
    
    // Remover ou desabilitar campos de Data Abertura
    const dataAberturaField = document.getElementById('DataAberturaConta');
    const valorField = document.getElementById('contaPagarValor');
    const numeroContaField = document.getElementById('contaPagarNumero');
    
    dataAberturaField.closest('.input-group').remove();
    valorField.closest('.input-group').remove();
    numeroContaField.closest('.input-group').remove();


    // Substitui o botão de "Cadastrar" por "Editar"
    const buttonContainer = document.querySelector('.button-container');
    const cadastrarButton = buttonContainer.querySelector('button');
    if (cadastrarButton) {
        cadastrarButton.remove(); // Remove o botão de cadastrar
    }

    // Cria o botão de "Editar"
    const editarButton = document.createElement('button');
    editarButton.type = 'submit';
    editarButton.textContent = 'Salvar Alterações'; // Texto do botão
    editarButton.addEventListener('click', editarContaPagar); // Adiciona a função de edição
    buttonContainer.appendChild(editarButton); // Adiciona o novo botão ao formulário
}

// Função para lidar com o envio do formulário (Cadastro ou Edição)
async function handleFormSubmit(event) {
    event.preventDefault();

    // Captura os dados do formulário
    const numeroConta = document.getElementById('contaPagarNumero').value;
    const categoria = document.getElementById('contaPagarCategoria').value;
    const dataAbertura = document.getElementById('DataAberturaConta').value;
    const dataVencimento = document.getElementById('DataVencimentoConta').value;
    const descricao = document.getElementById('contaPagarDescricao').value;
    const valor = parseFloat(document.getElementById('contaPagarValor').value);

    if ( !numeroConta || !dataAbertura || !dataVencimento || !descricao || isNaN(valor) || valor <= 0) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const conta = {
        idContasPagar: 0,
        idCategoriaDocumento: categoria,
        idUsuario: 1,
        numero: numeroConta,
        dataVencimento: dataVencimento,
        dataAbertura: dataAbertura,
        descricao: descricao,
        valor: valor
     };

   
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
        localStorage.removeItem('contaPagarId');
        document.querySelector(".cadastro-form").reset();
        window.location.href = '/html/contaPagar.html';

        alert("Conta a pagar cadastrada com sucesso!");
    } catch (error) {
        console.error("Erro ao cadastrar conta:", error);
        alert("Ocorreu um erro ao cadastrar a conta. Tente novamente.");
    }
}

// Função para editar a conta a pagar
async function editarContaPagar(event) {
    event.preventDefault();

    const contaPagarId = localStorage.getItem('contaPagarId');
    if (!contaPagarId) {
        alert("Não foi possível encontrar os dados para edição.");
        return;
    }

    const numeroConta = localStorage.getItem('contaPagarNumero');
    const categoria = document.getElementById("contaPagarCategoria").value;
    const dataAbertura  = localStorage.getItem('contaPagarDataAbertura');// Não será editável
    const dataVencimento = document.getElementById("DataVencimentoConta").value;
    const descricao = document.getElementById("contaPagarDescricao").value;
    const valor = localStorage.getItem('contaPagarValor');

    if (!numeroConta || !dataVencimento || !descricao || isNaN(valor) || valor <= 0) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const conta = {
        idContasPagar: contaPagarId,  // ID da conta a pagar para a edição
        idCategoriaDocumento: categoria,
        idUsuario: 1,
        numero: numeroConta,
        dataVencimento: dataVencimento,
        dataAbertura: dataAbertura,  // A data de abertura permanece inalterada
        descricao: descricao,
        valor: valor
    };
    console.log(conta);
    try {
        const response = await fetch(`https://localhost:7002/api/ContasPagar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(conta)
        });

        if (!response.ok) {
            throw new Error('Erro ao editar a conta a pagar');
        }

        const result = await response.json();
        console.log('Conta editada com sucesso:', result);

        // Limpar o localStorage e o formulário após a edição
        localStorage.removeItem('contaPagarId');
        document.querySelector(".cadastro-form").reset();
        window.location.href = '/html/contaPagar.html';  // Redireciona para a página de listagem

        alert("Conta a pagar editada com sucesso!");
    } catch (error) {
        console.error("Erro ao editar conta:", error);
        alert("Ocorreu um erro ao editar a conta. Tente novamente.");
    }
}
