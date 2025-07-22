using Microsoft.EntityFrameworkCore;
using Intern_Project.Models;

namespace Intern_Project.Data
{
    public class Intern_ProjectDbContext : DbContext
    {
        public Intern_ProjectDbContext(DbContextOptions<Intern_ProjectDbContext> options) : base(options)
        {

        }
        public DbSet<Parca> Parcalar { get; set; }
        public DbSet<Kategori> Kategoriler { get; set; }

        public DbSet<Kullanici> Kullanicilar { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Parca>()
                .HasOne(p => p.Kategori)
                .WithMany(k => k.Parcalar)
                .HasForeignKey(p => p.KategoriId);
        }
    }
    
}
