using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FinancEasy.Model
{
    public class TipoMovimentacao
    {
        [Key]  // Define a chave primária
        public int IdTipoMovimentacao { get; set; }
        public string Nome { get; set; }

        [JsonIgnore]
        public ICollection<MovimentacaoContaPagar> MovimentacoesContaPagar { get; set; }

        [JsonIgnore]
        public ICollection<MovimentacaoContasReceber> MovimentacoesContasReceber { get; set; }
    }
}
