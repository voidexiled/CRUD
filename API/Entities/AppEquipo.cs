using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class AppEquipo
    {
        public int id_equipo { get; set; }
        public string nombre { get; set; }
        public string institucion { get; set; }
        public string evento { get; set; }
        public int categoria { get; set; }
    }
}