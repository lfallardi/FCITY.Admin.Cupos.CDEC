using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using CuposAPI.Data;

namespace CuposAPI.Controllers
{
    [EnableCors("AllowAllOrigins")]
    [Route("api/[controller]")]
    [ApiController]
    public class CupoTransportadoraEstadoController : ControllerBase
    {

        private CuposDbContext _cuposDbContext;
        public CupoTransportadoraEstadoController(CuposDbContext cuposDbContext)
        {
            _cuposDbContext = cuposDbContext;
        }

        // GET: api/CupoTransportadoraEstado
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_cuposDbContext.V_ECCuposTransportadoras.ToList());
        }

    }
}
