using Microsoft.AspNetCore.Mvc;
using Intern_Project.Data;
using Intern_Project.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;


namespace Intern_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParcaController : ControllerBase
    {
        private readonly Intern_ProjectDbContext _context;

        public ParcaController(Intern_ProjectDbContext context)
        {
            _context = context;
        }

        // GET: api/parca
        [HttpGet]
        public async Task<ActionResult<Parca>> GetParca(int id)
        {
            var parca = await _context.Parcalar.FindAsync(id);

            if (parca == null)
                return NotFound();

            return parca;
        }
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Parca>> PostParca(Parca parca)
        {
            _context.Parcalar.Add(parca);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetParca), new {id = parca.Id}, parca);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> PutParca(int id, Parca parca)
        {
            if (id != parca.Id)
                return BadRequest();

            _context.Entry(parca).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch ( DbUpdateConcurrencyException )
            {
                if (!ParcaExists(id))
                    return NotFound();
                else
                    throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParca(int id)
        {
            var parca = await _context.Parcalar.FindAsync(id);
            if (parca == null) 
                return NotFound();
            _context.Parcalar.Remove(parca);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool ParcaExists(int id)
        {
            return _context.Parcalar.Any(e=> e.Id == id);
        }
    }
}
