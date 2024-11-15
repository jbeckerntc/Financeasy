using System.ComponentModel.DataAnnotations;

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

        public ICollection<ContaBancaria> ContasBancarias { get; set; }
        public ICollection<ContasPagar> ContasPagar { get; set; }
        public ICollection<ContasReceber> ContasReceber { get; set; }
    }
}
