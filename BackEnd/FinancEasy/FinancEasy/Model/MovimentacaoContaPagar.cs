using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace FinancEasy.Model
{
    public class MovimentacaoContaPagar
    {
        [Key]  // Define a chave primária
        public int IdMovimentacaoContaPagar { get; set; }
        public int IdTipoMovimentacao { get; set; }
        public int IdContaPagar { get; set; }
        public decimal Valor { get; set; }
        public DateTime DataMovimentacao { get; set; }
        public string Descricao { get; set; }

        [ForeignKey("IdTipoMovimentacao")]
        [JsonIgnore]

        public TipoMovimentacao TipoMovimentacao { get; set; }

        [ForeignKey("IdContaPagar")]
        [JsonIgnore]

        public ContasPagar ContaPagar { get; set; }
    }
}
