using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace CuposAPI.Models
{
    public class CupoBase
    {
        [Key]
        public int IdECCupoBase { get; set; }
        public string Dia { get; set; }
        public int CuposTotales { get; set; }
        public int PorcCuposDesactiva { get; set; }

    }
}
