using FinancEasy.Model;
using FinancEasy.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinancEasy.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContasPagarController : Controller
    {
        private readonly BancoDeDados _banco;

        public ContasPagarController(BancoDeDados context)
        {
            _banco = context;
        }

        /// <summary>
        /// Obtém todas as contas a pagar de um usuário.
        /// </summary>
        /// <param name="idUsuario">ID do usuário.</param>
        /// <returns>Lista de contas a pagar do usuário.</returns>

        [HttpGet]
        public IActionResult GetContaPagarUsuarioAll(int idUsuario)
        {
            var contasPagar = _banco.ContasPagar
                .Where(c => c.IdUsuario == idUsuario)
                .Include(c => c.CategoriaDocumento) // Inclui os dados de CategoriaDocumento
                .Include(c => c.Usuario) // Inclui os dados de Usuario
                .Include(c => c.Movimentacoes) // Inclui a coleção de Movimentacoes
                .ToList();

            // Verifica se não encontrou resultados
            if (contasPagar == null || !contasPagar.Any())
            {
                return NotFound($"Nenhuma conta a pagar encontrada para o usuário com ID {idUsuario}.");
            }

            // Retorna o resultado
            return Ok(contasPagar);
        }

        /// <summary>
        /// Obtém detalhes de uma conta a pagar específica.
        /// </summary>
        /// <param name="idContaPagar">ID da conta a pagar.</param>
        /// <returns>Detalhes da conta a pagar.</returns>

        [HttpGet("{idContaPagar}")]
        public IActionResult GetContaPagar(int idContaPagar)
        {
            var contasPagar = _banco.ContasPagar
                .Where(c => c.IdContasPagar == idContaPagar)
                .Include(c => c.CategoriaDocumento) // Inclui os dados de CategoriaDocumento
                .Include(c => c.Usuario) // Inclui os dados de Usuario
                .Include(c => c.Movimentacoes) // Inclui a coleção de Movimentacoes
                .ToList();

            // Verifica se não encontrou resultados
            if (contasPagar == null || !contasPagar.Any())
            {
                return NotFound($"Nenhuma conta a pagar encontrada para o ID {idContaPagar}.");
            }

            // Retorna o resultado
            return Ok(contasPagar);
        }

        /// <summary>
        /// Cadastra uma nova conta a pagar.
        /// </summary>
        /// <param name="contaPagarDTO">Dados da nova conta a pagar.</param>
        /// <returns>Status de sucesso ou erro.</returns>

        [HttpPost]
        public IActionResult PostCadastrarContaPagar(ContaPagarDTO contaPagarDTO)
        {
            var ultimoId = _banco.ContasPagar
               .OrderByDescending(c => c.IdContasPagar)
               .Select(c => c.IdContasPagar)
               .FirstOrDefault();

            var contaPagarNova = new ContasPagar
            {
                IdContasPagar = ultimoId + 1,
                IdCategoriaDocumento = contaPagarDTO.IdCategoriaDocumento,
                IdUsuario = contaPagarDTO.IdUsuario,
                Numero = contaPagarDTO.Numero,
                DataVencimento = contaPagarDTO.DataVencimento,
                DataAbertura = contaPagarDTO.DataAbertura,
                Descricao = contaPagarDTO.Descricao,
                Valor = contaPagarDTO.Valor,
            };

            _banco.ContasPagar.Add(contaPagarNova);
            _banco.SaveChanges();

            return Ok();
        }

        /// <summary>
        /// Atualiza uma conta a pagar existente.
        /// </summary>
        /// <param name="contaPagarDTO">Dados atualizados da conta a pagar.</param>
        /// <returns>Status de sucesso ou erro.</returns>

        [HttpPut]
        public IActionResult PutAtualizaContaPagar(ContaPagarDTO contaPagarDTO)
        {

            var contaPagarExistente = _banco.ContasPagar.FirstOrDefault(c => c.IdContasPagar == contaPagarDTO.IdContasPagar);
            if (contaPagarExistente == null)
            {
                return NotFound("Conta a pagar não encontrada.");
            }

            contaPagarExistente.Descricao = contaPagarDTO.Descricao;
            contaPagarExistente.IdCategoriaDocumento = contaPagarDTO.IdCategoriaDocumento;
            contaPagarExistente.DataVencimento = contaPagarDTO.DataVencimento;

            _banco.SaveChanges();

            return Ok();
        }

        /// <summary>
        /// Remove uma conta a pagar existente.
        /// </summary>
        /// <param name="idContaPagar">ID da conta a pagar a ser excluída.</param>
        /// <returns>Status de sucesso ou erro.</returns>

        [HttpDelete("{idContaPagar}")]
        public IActionResult RemoveApagaContaPagar(int idContaPagar)
        {
            var contaPagar = _banco.ContasPagar.FirstOrDefault(c => c.IdContasPagar == idContaPagar);
            if (contaPagar == null)
            {
                return NotFound("Conta a pagar não encontrada");
            }
            else
            {

            }

            var movimentacaoContasPagar = _banco.MovimentacaoContaPagar
            .Where(c => c.IdContaPagar == idContaPagar)
            .ToList();

            try
            {

                _banco.Remove(movimentacaoContasPagar);
                _banco.Remove(contaPagar);
                _banco.SaveChanges();

                return Ok("Conta a pagar excluída com sucesso.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro inesperado: {ex.Message}");
            }
        }
    }
}
