using FinancEasy.Model;
using FinancEasy.Utils;
using Microsoft.AspNetCore.Mvc;

namespace FinancEasy.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MovimentacaoContaPagarController : Controller
    {
        private readonly BancoDeDados _banco;

        public MovimentacaoContaPagarController(BancoDeDados context)
        {
            _banco = context;
        }

        /// <summary>
        /// Cadastra uma nova movimentação de conta a pagar.
        /// </summary>
        /// <param name="MovimentacaoContaPagarDTO">Objeto com os dados da movimentação.</param>
        /// <returns>Retorna um código de status HTTP indicando o resultado da operação.</returns>

        [HttpPost]
        public IActionResult PostCadastrarContaPagar(MovimentacaoContaPagarDTO MovimentacaoContaPagarDTO)
        {
            var ultimoId = _banco.MovimentacaoContaPagar
               .OrderByDescending(c => c.IdMovimentacaoContaPagar)
               .Select(c => c.IdMovimentacaoContaPagar)
               .FirstOrDefault();

            var movimentacaoNova = new MovimentacaoContaPagar
            {
                IdMovimentacaoContaPagar = ultimoId + 1,
                IdTipoMovimentacao = MovimentacaoContaPagarDTO.IdTipoMovimentacao,
                IdContaPagar = MovimentacaoContaPagarDTO.IdContaPagar,
                Valor = MovimentacaoContaPagarDTO.Valor,
                DataMovimentacao = MovimentacaoContaPagarDTO.DataMovimentacao,
                Descricao = MovimentacaoContaPagarDTO.Descricao,

            };

            _banco.MovimentacaoContaPagar.Add(movimentacaoNova);
            _banco.SaveChanges();

            return Ok();
        }

    }
}
