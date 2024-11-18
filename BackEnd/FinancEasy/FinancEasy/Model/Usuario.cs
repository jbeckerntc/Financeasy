using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FinancEasy.Model
{
    public class Usuario
    {
        [Key]  // Define a chave primária
        public int IdUsuario { get; set; }
        public string Nome { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Email { get; set; }
        public string Cidade { get; set; }
        public string Endereco { get; set; }
        public string Senha { get; set; }

        [JsonIgnore]
        public ICollection<ContaBancaria> ContasBancarias { get; set; }

        [JsonIgnore]
        public ICollection<ContasPagar> ContasPagar { get; set; }

        [JsonIgnore]
        public ICollection<ContasReceber> ContasReceber { get; set; }
    }
}
