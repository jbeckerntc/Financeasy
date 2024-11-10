namespace FinancEasy.Model
{
    public class TipoMovimentacao
    {
        public int IdTipoMovimentacao { get; set; }
        public string Nome { get; set; }

        public ICollection<MovimentacaoContaPagar> MovimentacoesContaPagar { get; set; }
        public ICollection<MovimentacaoContasReceber> MovimentacoesContasReceber { get; set; }
    }
}
