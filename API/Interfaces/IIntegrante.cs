using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
namespace API.Interfaces
{

    public interface IIntegrante
    {
        Task<IEnumerable<Integrante>> GetAllIntegrantes();
        Task<IEnumerable<Integrante>> GetIntegrantesByEquipo(int id);
        Task<Integrante> GetIntegranteById(int id);

        Task<Integrante> CreateIntegrante(Integrante integrante);
        Task<Integrante> UpdateIntegrante(Integrante integrante);
        Task<Integrante> DeleteIntegrante(int id);

    }

}