using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CuposAPI.Models;

namespace CuposAPI.Data
{
    public class CuposDbContext : DbContext
    {

        public CuposDbContext(DbContextOptions<CuposDbContext>options):base(options)
        {

        }

        public DbSet<CupoBase> ECCupoBase { get; set; }
        public DbSet<CupoProducto> ECCupoProducto { get; set; }
        public DbSet<CupoBaseProducto> ECCupoBaseProducto { get; set; }
        public DbSet<CupoTransportadoraEstado> V_ECCuposTransportadoras { get; set; }
    }
}
