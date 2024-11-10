namespace FinancEasy.Model
{
    public class ContasPagar
    {
        public int IdContasPagar { get; set; }
        public int IdCategoriaDocumento { get; set; }
        public int IdUsuario { get; set; }
        public string Numero { get; set; }
        public DateTime DataVencimento { get; set; }
        public DateTime DataAbertura { get; set; }
        public string Descricao { get; set; }
        public decimal Valor { get; set; }

        public CategoriaDocumento CategoriaDocumento { get; set; }
        public Usuario Usuario { get; set; }
        public ICollection<MovimentacaoContaPagar> Movimentacoes { get; set; }
    }
}
