namespace FinancEasy.Model
{
    public class MovimentacaoContaPagarDTO
    {
        public int IdMovimentacaoContaPagar { get; set; }
        public int IdTipoMovimentacao { get; set; }
        public int IdContaPagar { get; set; }
        public decimal Valor { get; set; }
        public DateTime DataMovimentacao { get; set; }
        public string Descricao { get; set; }
    }
}
