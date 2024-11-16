using FinancEasy.Utils;
using Microsoft.AspNetCore.Mvc;

namespace FinancEasy.Controllers
{
    public class MovimentacaoContaPagarController : Controller
    {
        private readonly BancoDeDados _banco;

        // Injetando o contexto do banco de dados
        public MovimentacaoContaPagarController(BancoDeDados context)
        {
            _banco = context;
        }

        [HttpGet]
        public IActionResult GetMovimentacaoContaPagar(int IdcontaPagar)
        {
            // Filtra as contas bancárias do usuário com o ID fornecido
            var movimentacaos = _banco.MovimentacaoContasPagar
                .Where(c => c.IdContaPagar == IdcontaPagar) // Assume que ContaBancaria tem a propriedade UsuarioId
                .ToList();

            if (movimentacaos == null || movimentacaos.Count == 0)
            {
                return NotFound($"Nenhuma movimentacao encontrada para o conta {IdcontaPagar}.");
            }

            return Ok(movimentacaos);

        }
    }
}
