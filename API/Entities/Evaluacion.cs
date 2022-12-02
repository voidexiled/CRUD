using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Evaluacion
    {
        public int id_evaluacion { get; set; }
        public int proyecto { get; set; }
        public string jurado { get; set; }
        public int evento { get; set; }
    }
}