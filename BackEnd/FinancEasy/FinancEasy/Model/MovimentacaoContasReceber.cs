namespace FinancEasy.Model
{
    public class MovimentacaoContasReceber
    {
        public int IdMovimentacaoContaReceber { get; set; }
        public int IdTipoMovimentacao { get; set; }
        public int IdContaReceber { get; set; }
        public decimal Valor { get; set; }
        public DateTime DataMovimentacao { get; set; }
        public string Descricao { get; set; }

        public TipoMovimentacao TipoMovimentacao { get; set; }
        public ContasReceber ContaReceber { get; set; }
    }
}
