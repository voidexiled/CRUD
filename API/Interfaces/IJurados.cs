using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IJurados
    {
        Task<IEnumerable<Jurado>> GetAllJurados();
        Task<Jurado> GetJuradoByCurp(string id);
        Task<bool> CreateJurado(Jurado jurado);
        Task<bool> UpdateJurado(Jurado jurado);
        Task<bool> DeleteJurado(string id);


    }
}