using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinancEasy.Model
{
    public class ContaBancaria
    {
        [Key]  // Define a chave primária
        public int IdContaBancaria { get; set; }
        public int IdUsuario { get; set; } //Fk
        public string Nome { get; set; }
        public string Agencia { get; set; }
        public string Conta { get; set; }

        [ForeignKey("IdUsuario")]
        public Usuario Usuario { get; set; }

        // Relacionamento 1:N (Uma ContaBancaria pode ter muitas movimentacoes)
        public ICollection<MovimentacaoContaBancaria> Movimentacoes { get; set; }
    }
}
