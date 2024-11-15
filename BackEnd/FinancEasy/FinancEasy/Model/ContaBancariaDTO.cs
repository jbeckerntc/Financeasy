namespace FinancEasy.Model
{
    public class ContaBancariaDTO
    {
        public int IdContaBancaria { get; set; }
        public int IdUsuario { get; set; } // FK
        public string Nome { get; set; }
        public string Agencia { get; set; }
        public string Conta { get; set; }
    }
}
