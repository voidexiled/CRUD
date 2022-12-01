using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
namespace API.Interfaces
{
    public interface IEquipos
    {
        Task<IEnumerable<Equipo>> GetAllEquipos();
        Task<Equipo> GetEquipoById(int id);
        Task<Equipo> CreateEquipo(Equipo equipo);
        Task<Equipo> UpdateEquipo(Equipo equipo);
        Task<Equipo> DeleteEquipo(int id);

    }
}