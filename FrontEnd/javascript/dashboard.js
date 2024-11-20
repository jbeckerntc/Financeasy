document.addEventListener('DOMContentLoaded', function() {
    // Função para carregar os dados da API
    async function fetchData() {
        try {
            // Processando os dados JSON
            const contasPagarData = { valor: 5000.25 };
            const contasReceberData = { valor: 7300.25 };
            // Atualizando os valores no dashboard
            document.getElementById('contasPagarValue').innerText = `R$ ${contasPagarData.valor}`;
            document.getElementById('contasReceberValue').innerText = `R$ ${contasReceberData.valor}`;
            document.getElementById('saldoValue').innerText = `R$ ${(contasReceberData.valor) - (contasPagarData.valor)}`;

            // Atualizando o gráfico
            updateChart(contasPagarData.valor, contasReceberData.valor);

        } catch (error) {
            console.error('Erro ao carregar os dados da API:', error);
            document.getElementById('contasPagarValue').innerText = 'Erro ao carregar';
            document.getElementById('contasReceberValue').innerText = 'Erro ao carregar';
            document.getElementById('saldoValue').innerText = 'Erro ao carregar';
        }
    }

    // Função para atualizar o gráfico
    function updateChart(contasPagar, contasReceber) {
        const ctx = document.getElementById('grafico').getContext('2d');
        
        // Configuração do gráfico
        const chart = new Chart(ctx, {
            type: 'bar', // Tipo de gráfico
            data: {
                labels: ['Contas a Pagar', 'Contas a Receber'], // Rótulos
                datasets: [{
                    label: '' ,
                    data: [contasPagar, contasReceber], // Dados a serem exibidos
                    backgroundColor: ['#FF5733', '#33FF57'], // Cor das barras
                    borderColor: ['#FF5733', '#33FF57'],
                    borderWidth: 1,
                    barThickness: 100, // Ajuste a largura das barras (em pixels)
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false, // Remover a legenda
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Chama a função para carregar os dados ao carregar a página
    fetchData();
});