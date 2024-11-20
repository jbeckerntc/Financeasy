using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace FinancEasy.Model
{
    public class MovimentacaoContaBancaria
    {
        [Key]  // Define a chave primária
        public int IdMovimentacaoContaBancaria { get; set; }
        public int IdContaBancaria { get; set; }
        public DateTime DataMovimentacao { get; set; }
        public string Descricao { get; set; }
        public decimal Valor { get; set; }
        public int Tipo { get; set; }

        [ForeignKey("IdContaBancaria")]
        [JsonIgnore]

        public ContaBancaria ContaBancaria { get; set; }
    }
}
