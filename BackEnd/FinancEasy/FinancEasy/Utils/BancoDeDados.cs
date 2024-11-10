using FinancEasy.Model;
using Microsoft.EntityFrameworkCore;

namespace FinancEasy.Utils
{
    public class BancoDeDados : DbContext
    {

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<ContasPagar> ContasPagar { get; set; }
        public DbSet<ContasReceber> ContasReceber { get; set; }
        public DbSet<ContaBancaria> ContasBancaria { get; set; }
        public DbSet<CategoriaDocumento> CategoriasDocumentos { get; set; }
        public DbSet<MovimentacaoContaBancaria> MovimentacaoContaBancarias { get; set; }
        public DbSet<MovimentacaoContaPagar> MovimentacaoContasPagar { get; set; }
        public DbSet<MovimentacaoContasReceber> MovimentacaoContasReceber { get; set; }
        public DbSet<TipoMovimentacao> TipoMovimentacaos { get; set; }

        /*

        1. Create (Inserir)

        using (var context = new AppDbContext())
        {
            var usuario = new Usuario
            {
                Nome = "João Silva",
                Email = "joao@exemplo.com"
            };
    
            context.Usuarios.Add(usuario);
            context.SaveChanges(); // Salva as mudanças no banco de dados
        }

        ========================

        2. Read (Ler)

        using (var context = new AppDbContext())
        {
            // Buscar todos os usuários
            var usuarios = context.Usuarios.ToList();

            // Buscar um usuário pelo ID
            var usuario = context.Usuarios.FirstOrDefault(u => u.Id == 1);
    
            // Buscar usuário com uma condição
            var usuarioNome = context.Usuarios.Where(u => u.Nome.Contains("João")).ToList();
        }

        3. Update (Atualizar)

        using (var context = new AppDbContext())
        {
            var usuario = context.Usuarios.FirstOrDefault(u => u.Id == 1);
            if (usuario != null)
            {
                usuario.Nome = "João Silva Atualizado";
                context.SaveChanges(); // Aplica as mudanças no banco
            }
        }

        4. Delete (Excluir)

        using (var context = new AppDbContext())
        {
            var usuario = context.Usuarios.FirstOrDefault(u => u.Id == 1);
            if (usuario != null)
            {
                context.Usuarios.Remove(usuario);
                context.SaveChanges(); // Exclui do banco de dados
            }
        }

        */
    }
}
