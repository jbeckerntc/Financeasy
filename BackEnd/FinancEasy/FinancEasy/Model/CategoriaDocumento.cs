using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FinancEasy.Model
{
    public class CategoriaDocumento
    {

        [Key]  // Define a chave primária
        public int IdCategoriaDocumento { get; set; }
        public string Nome { get; set; }

        [JsonIgnore]
        public ICollection<ContasPagar> ContasPagar { get; set; }

        [JsonIgnore]
        public ICollection<ContasReceber> ContasReceber { get; set; }
    }
}
