using FinancEasy.Model;
using FinancEasy.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace FinancEasy.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContaBancariaController : Controller
    {
        private readonly BancoDeDados _context;

        // Injetando o contexto do banco de dados
        public ContaBancariaController(BancoDeDados context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetContaBancariasUsuario(int idUsuario)
        {
            // Filtra as contas bancárias do usuário com o ID fornecido
            var contas = _context.ContaBancaria
                .Where(c => c.IdUsuario == idUsuario) // Assume que ContaBancaria tem a propriedade UsuarioId
                .ToList();

            if (contas == null || contas.Count == 0)
            {
                return NotFound($"Nenhuma conta bancária encontrada para o usuário com ID {idUsuario}.");
            }

            return Ok(contas);

        }

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
