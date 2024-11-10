using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FinancEasy.Controllers
{
    public class ContaBancariaController : Controller
    {
        /*
         Exemplo select contas bancarias

        using (var context = new AppDbContext())
        {
            // Carregando a conta bancária com suas movimentações
            var contaBancaria = context.ContaBancarias
                .Include(c => c.Movimentacoes) // Incluindo as movimentações associadas, faz com que o Entity Framework carregue não só os dados da ContaBancaria, mas também as Movimentacoes associadas a essa conta, que estão relacionadas de forma 1
                .FirstOrDefault(c => c.IdContaBancaria == 1); // Filtrando pela conta bancária com Id 1

            if (contaBancaria != null)
            {
                Console.WriteLine($"Conta Bancária: {contaBancaria.Nome} - Agência: {contaBancaria.Agencia}");
                foreach (var movimentacao in contaBancaria.Movimentacoes)
                {
                    Console.WriteLine($"Movimentação: {movimentacao.Valor} - Data: {movimentacao.DataMovimentacao}");
                }
            }
        }
         */
    }
}
