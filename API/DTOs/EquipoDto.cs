using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class EquipoDto
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Institucion { get; set; }
        public string Evento { get; set; }
        public int Categoria { get; set; }



    }
}