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
        Task<IEnumerable<Equipo>> GetEquiposByCategory(int cat_id);


        Task<Equipo> GetEquipoById(int id);
        Task<Equipo> GetEquipoByName(string name);


        Task<bool> CreateEquipo(Equipo equipo);
        Task<bool> UpdateEquipo(Equipo equipo);
        Task<bool> DeleteEquipo(int id);

    }
}