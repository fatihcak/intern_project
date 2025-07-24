using Microsoft.AspNetCore.Mvc;
using Intern_Project.Data;
using Intern_Project.Models;
using Microsoft.EntityFrameworkCore;


namespace Intern_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KategoriController : ControllerBase
    {
        private readonly Intern_ProjectDbContext _context;

        public KategoriController(Intern_ProjectDbContext context)
        {
            _context = context;
        }

        // GET: api/kategori/5
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Kategori>>> GetKategori()
        {
            return await _context.Kategoriler.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Kategori>> GetKategori(int id)
        {
            var kategori = await _context.Kategoriler.FindAsync(id);

            if (kategori == null)
                return NotFound();

            return kategori;
        }
        [HttpPost]
        public async Task<ActionResult<Kategori>> PostKategori(Kategori kategori)
        {
            _context.Kategoriler.Add(kategori);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetKategori), new { id = kategori.Id }, kategori);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> PutKategori(int id, Kategori kategori)
        {
            if (id != kategori.Id)
                return BadRequest();

            _context.Entry(kategori).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KategoriExists(id))
                    return NotFound();
                else
                    throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKategori(int id)
        {
            var kategori = await _context.Kategoriler.FindAsync(id);
            if (kategori == null)
                return NotFound();
            _context.Kategoriler.Remove(kategori);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool KategoriExists(int id)
        {
            return _context.Kategoriler.Any(e => e.Id == id);
        }
    }
}
