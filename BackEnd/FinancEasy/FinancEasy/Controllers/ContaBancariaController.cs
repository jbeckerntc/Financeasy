using FinancEasy.Model;
using FinancEasy.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace FinancEasy.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContaBancariaController : Controller
    {
        private readonly BancoDeDados _banco;

        // Injetando o contexto do banco de dados
        public ContaBancariaController(BancoDeDados context)
        {
            _banco = context;
        }

        /// <summary>
        /// Obtém todas as contas bancárias de um usuário.
        /// </summary>
        /// <param name="idUsuario">ID do usuário</param>
        /// <returns>Lista de contas bancárias</returns>

        [HttpGet]
        public IActionResult GetContaBancariasUsuario(int idUsuario)
        {
            // Filtra as contas bancárias do usuário com o ID fornecido
            var contas = _banco.ContaBancaria
                .Where(c => c.IdUsuario == idUsuario) // Assume que ContaBancaria tem a propriedade UsuarioId
                .ToList();

            if (contas == null || contas.Count == 0)
            {
                return NotFound($"Nenhuma conta bancária encontrada para o usuário com ID {idUsuario}.");
            }

            return Ok(contas);

        }

        /// <summary>
        /// Cadastra uma nova conta bancária.
        /// </summary>
        /// <param name="contaBancariaDTO">Dados da conta bancária</param>
        /// <returns>Status da operação</returns>
        
        [HttpPost]
        public IActionResult PostCadastraContaBancaria(ContaBancariaDTO contaBancariaDTO)
        {
            var ultimoId = _banco.ContaBancaria
                       .OrderByDescending(c => c.IdContaBancaria)
                       .Select(c => c.IdContaBancaria)
                       .FirstOrDefault();

            var contaBancariaNova = new ContaBancaria
            {  
                IdContaBancaria = ultimoId + 1,
                IdUsuario = contaBancariaDTO.IdUsuario,
                Nome = contaBancariaDTO.Nome,
                Agencia = contaBancariaDTO.Agencia,
                Conta = contaBancariaDTO.Conta
            };

            _banco.ContaBancaria.Add(contaBancariaNova);
            _banco.SaveChanges();

            return Ok();
        }

        /// <summary>
        /// Atualiza os dados de uma conta bancária existente.
        /// </summary>
        /// <param name="contaBancariaDTO">Dados atualizados da conta bancária</param>
        /// <returns>Status da operação</returns>

        [HttpPut]
        public IActionResult PutAtualizaContaBancaria(ContaBancariaDTO contaBancariaDTO)
        {
            var contaExistente = _banco.ContaBancaria.FirstOrDefault(c => c.IdContaBancaria == contaBancariaDTO.IdContaBancaria);
            if (contaExistente == null)
            {
                return NotFound("Conta bancária não encontrada.");
            }

            contaExistente.Nome = contaBancariaDTO.Nome;
            contaExistente.Agencia = contaBancariaDTO.Agencia;
            contaExistente.Conta = contaBancariaDTO.Conta;

            _banco.SaveChanges();

            return Ok();
        }

        /// <summary>
        /// Remove uma conta bancária.
        /// </summary>
        /// <param name="idContaBancaria">ID da conta bancária</param>
        /// <returns>Status da operação</returns>

        [HttpDelete]
        public IActionResult RemoveApagaContaBancaria(int idContaBancaria)
        {
            var conta = _banco.ContaBancaria.FirstOrDefault(c => c.IdContaBancaria == idContaBancaria);
            if (conta == null)
            {
                return NotFound("Conta não encontrada");
            }

            try
            {
                _banco.Remove(conta);
                _banco.SaveChanges();

                return Ok("Conta bancária excluída com sucesso.");
            }
            catch (DbUpdateException dbEx)
            {
                // Verifica se a exceção é relacionada a chave estrangeira
                if (dbEx.InnerException != null && dbEx.InnerException.Message.Contains("FOREIGN KEY"))
                {
                    return BadRequest("Não é possível excluir a conta bancária porque ela está sendo usada em outros registros.");
                }

                // Caso seja outro erro, retornar uma mensagem genérica
                return StatusCode(500, "Ocorreu um erro ao tentar excluir a conta bancária.");
            }
            catch (Exception ex)
            {
                // Capturar qualquer outro tipo de exceção
                return StatusCode(500, $"Erro inesperado: {ex.Message}");
            }
        }

    }
}
