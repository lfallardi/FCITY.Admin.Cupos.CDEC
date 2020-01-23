using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using CuposAPI.Models;

namespace CuposAPI.Models
{
    public class CupoTransportadoraEstado
    {

        [Key]
        public int IdECCupoTransportadoraEstado { get; set; }
        public int IDECCupoProductoTransportadora { get; set; }
        public int IdECCupoDia { get; set; }
        public int IdECCupoProducto { get; set; }
        public DateTime FechaEntrega { get; set; }
        public DateTime FechaCupo { get; set; }
        public DateTime FechaAlta { get; set; }
        public string NombreTransportadora { get; set; }
        public int IdECCupoTransportadoraEstadoMotivo { get; set; }
        public bool Bloqueada { get; set; }
        public DateTime FechaBloqueo { get; set; }
        public bool Activo { get; set; }
        public string Descripcion { get; set; }
        public int CupoConsumido { get; set; }
        public int CuposMaximo { get; set; }

    }
}
