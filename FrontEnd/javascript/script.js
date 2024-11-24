
function MudaImgSeta() {
    var seta = document.getElementById("setaRelatorio");
    var menuRelatorios = document.getElementById("menuRelatorios");
    
    // Verifica o estado da seta e altera a imagem e mostra o submenu
    if (seta.src.includes("icon-setaCima.png")) {
        menuRelatorios.classList.add("show"); 
        seta.src = "/img/icon-setaBaixo.png"; 
    } else {
        menuRelatorios.classList.remove("show");
        seta.src = "/img/icon-setaCima.png";
    }
    
}

async function baixarRelatorio() {
    try {
        // Fazer a requisição para a API que retorna as contas a pagar em aberto
        const response = await fetch('https://localhost:7002/api/ContasPagar?idUsuario=1');
        const data = await response.json();

        // Verifica se a resposta contém o array de valores
        const contas = data;

        // Se não encontrar dados, exibe um alerta
        if (!contas || contas.length === 0) {
            alert('Não há contas a pagar em aberto.');
            return;
        }

        // Cria o CSV
        const csvData = contas.map(conta => ({
            "Numero da Conta": conta.numero,
            "Categoria": conta.categoriaDocumento?.nome || 'N/A',
            "Data Abertura": conta.dataAbertura,
            "Data Vencimento": conta.dataVencimento,
            "Descrição": conta.descricao,
            "Valor": conta.valor
        }));

        // Converte para CSV
        const csv = convertToCSV(csvData);
        
        // Baixa o arquivo CSV
        downloadCSV(csv, 'contas_a_pagar_em_aberto.csv');
        
    } catch (error) {
        console.error('Erro ao carregar os dados para o relatório:', error);
        alert('Erro ao gerar o relatório.');
    }
}

// Função para converter os dados em formato CSV
function convertToCSV(data) {
    const headers = Object.keys(data[0]); // Extrai as chaves como cabeçalhos
    const csvRows = [];

    // Adiciona o cabeçalho
    csvRows.push(headers.join(';'));

    // Adiciona os dados das contas
    data.forEach(item => {
        const values = headers.map(header => item[header]);
        csvRows.push(values.join(';'));
    });

    // Junta as linhas e retorna a string CSV
    return csvRows.join('\n');
}

// Função para baixar o CSV como um arquivo
function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) { // Verifica se o navegador suporta download
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
