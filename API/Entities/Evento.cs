using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;

namespace API.Entities
{
    public class Evento
    {
        public int id_evento { get; set; }
        public string nombre { get; set; }
        public string sede { get; set; }
        public string fecha { get; set; }
    }
}