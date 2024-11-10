using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinancEasy.Model
{
    public class MovimentacaoContasReceber
    {
        [Key]  // Define a chave primária
        public int IdMovimentacaoContaReceber { get; set; }
        public int IdTipoMovimentacao { get; set; }
        public int IdContaReceber { get; set; }
        public decimal Valor { get; set; }
        public DateTime DataMovimentacao { get; set; }
        public string Descricao { get; set; }

        [ForeignKey("IdTipoMovimentacao")]
        public TipoMovimentacao TipoMovimentacao { get; set; }

        [ForeignKey("IdContaReceber")]
        public ContasReceber ContaReceber { get; set; }
    }
}
