namespace FinancEasy.Model
{
    public class CategoriaDocumento
    {
        public int IdCategoriaDocumento { get; set; }
        public string Nome { get; set; }

        public ICollection<ContasPagar> ContasPagar { get; set; }
        public ICollection<ContasReceber> ContasReceber { get; set; }
    }
}
