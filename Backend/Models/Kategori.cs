using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Intern_Project.Models
{
    public class Kategori
    {
        [JsonIgnore]
        public int Id { get; set; }

        [Required]
        public string Ad { get; set; }

        [JsonIgnore]
        public List<Parca>? Parcalar { get; set; }
    }
}
