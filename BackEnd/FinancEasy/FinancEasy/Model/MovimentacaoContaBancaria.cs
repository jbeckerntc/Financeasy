namespace FinancEasy.Model
{
    public class MovimentacaoContaBancaria
    {
        public int IdMovimentacaoContaBancaria { get; set; }
        public int IdContaBancaria { get; set; }
        public DateTime DataMovimentacao { get; set; }
        public string Descricao { get; set; }
        public decimal Valor { get; set; }
        public int Tipo { get; set; }

        public ContaBancaria ContaBancaria { get; set; }
    }
}
