using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace CuposAPI.Models
{
    public class CupoBaseProducto
    {
        [Key]
        public int IdECCupoBaseProducto { get; set; }
        public int IdECCupoBase { get; set; }
        public int IdECCupoProducto { get; set; }
        public int PorcCuposMinimos { get; set; }
    }
}
