
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Intern_Project.Data;
using Intern_Project.Models;
using Microsoft.AspNetCore.Authorization;


namespace Intern_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KullaniciController : ControllerBase
    {
        private readonly Intern_ProjectDbContext _context;

        public KullaniciController(Intern_ProjectDbContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Kullanici>>> GetKullanicilar()
        {
            return await _context.Kullanicilar.ToListAsync();
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutKullanıcı(int id, Kullanici kullanici)
        {
            if (id != kullanici.Id) {
                return BadRequest("ID Eşleşmiyor!");
            }
            _context.Entry(kullanici).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return Ok("Kullanıcı güncellendi");
            }
            catch (DbUpdateConcurrencyException) {
                if (!_context.Kullanicilar.Any(e => e.Id == id))
                {
                    return NotFound("Kullanıcı bulunamadı!");
                }
                else
                {
                    throw;
                }
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKullanici(int id)
        {
            var kullanici = await _context.Kullanicilar.FindAsync(id);
            if (kullanici == null)
            {
                return NotFound("Kullanıcı bulunamadı.");
            }
            _context.Kullanicilar.Remove(kullanici);
            await _context.SaveChangesAsync();

            return Ok("Kullanıcı silindi.");
        }
    }
}
