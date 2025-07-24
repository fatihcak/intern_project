using System.Text.Json.Serialization;

namespace Intern_Project.Models
{
    public class Parca
    {
        [JsonIgnore]
        public int Id { get; set; }
        public string Ad { get; set; }
        public string Marka{ get; set; }
        public decimal Fiyat { get; set; }
        public int StokAdedi {  get; set; }
        public DateTime EklenmeTarihi { get; set; } = DateTime.Now;
        [JsonIgnore]
        public int? KategoriId { get; set; } // Foreign Key
        public Kategori? Kategori { get; set; } // Navigation Properyy
    }
}
