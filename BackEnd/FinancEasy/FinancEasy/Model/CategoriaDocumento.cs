using System.ComponentModel.DataAnnotations;

namespace FinancEasy.Model
{
    public class CategoriaDocumento
    {

        [Key]  // Define a chave primária
        public int IdCategoriaDocumento { get; set; }
        public string Nome { get; set; }

        public ICollection<ContasPagar> ContasPagar { get; set; }
        public ICollection<ContasReceber> ContasReceber { get; set; }
    }
}
