using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace CuposAPI.Models
{
    public class CupoProducto
    {
        [Key]
        public int IdECCupoProducto { get; set; }
        public string NombreProducto { get; set; }
        public string IdPrioridadIngresa { get; set; }
        public bool Activo { get; set; }
        public bool EsDomicilio2 { get; set; }
        public string HoraTope { get; set; }

    }
}
