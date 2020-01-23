using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CuposAPI.Data;
using CuposAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;

namespace CuposAPI.Controllers
{
    [EnableCors("AllowAllOrigins")]
    [Route("api/[controller]")]
    [ApiController]
    public class CuposBaseController : ControllerBase
    {

        private CuposDbContext _cuposDbContext;
        public CuposBaseController(CuposDbContext cuposDbContext)
        {
            _cuposDbContext = cuposDbContext;
        }

        // GET: api/CuposBase
        [HttpGet()]
        public IActionResult Get()
        {

            return Ok(_cuposDbContext.ECCupoBase.ToList());

        }

        // GET: api/CuposBase/1
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var cupoBase = _cuposDbContext.ECCupoBase.Find(id);
            if (cupoBase==null) 
            { 
                return NotFound("No se encontro el registro"); 
            }
            return Ok(cupoBase);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] CupoBase cupo)
        {
            var entity = _cuposDbContext.ECCupoBase.Find(id);
            if (entity==null)
            {
                return NotFound("No se ha encontrado el registro para actualizar.");
            }
            entity.CuposTotales = cupo.CuposTotales;
            entity.PorcCuposDesactiva = cupo.PorcCuposDesactiva;
            _cuposDbContext.SaveChanges();
            return Ok();
        }
    }
}
