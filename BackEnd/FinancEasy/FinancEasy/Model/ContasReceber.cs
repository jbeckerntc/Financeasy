using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace FinancEasy.Model
{
    public class ContasReceber
    {
        [Key]  // Define a chave primária
        public int IdContasReceber { get; set; }
        public int IdCategoriaDocumento { get; set; }
        public int IdUsuario { get; set; }
        public string Numero { get; set; }
        public DateTime DataVencimento { get; set; }
        public DateTime DataAbertura { get; set; }
        public string Descricao { get; set; }
        public decimal Valor { get; set; }

        [ForeignKey("IdCategoriaDocumento")]
        [JsonIgnore]

        public CategoriaDocumento CategoriaDocumento { get; set; }

        [ForeignKey("IdUsuario")]
        [JsonIgnore]

        public Usuario Usuario { get; set; }

        [JsonIgnore]

        public ICollection<MovimentacaoContasReceber> Movimentacoes { get; set; }
    }
}
