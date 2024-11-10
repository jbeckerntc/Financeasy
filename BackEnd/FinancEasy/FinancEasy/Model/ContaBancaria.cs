namespace FinancEasy.Model
{
    public class ContaBancaria
    {
        public int IdContaBancaria { get; set; }
        public int IdUsuario { get; set; }
        public string Nome { get; set; }
        public string Agencia { get; set; }
        public string Conta { get; set; }

        public Usuario Usuario { get; set; }

        // Relacionamento 1:N (Uma ContaBancaria pode ter muitas movimentacoes)
        public ICollection<MovimentacaoContaBancaria> Movimentacoes { get; set; }
    }
}
