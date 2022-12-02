using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
namespace API.Interfaces
{

    public interface IIntegrantes
    {
        Task<IEnumerable<Integrante>> GetAllIntegrantes();
        Task<IEnumerable<Integrante>> GetIntegrantesByEquipo(int id);
        Task<Integrante> GetIntegranteById(string id);

        Task<int> CountIntegrantesByEquipo(int eq_id);
        Task<bool> CreateIntegrante(Integrante integrante);
        Task<bool> UpdateIntegrante(Integrante integrante);
        Task<bool> DeleteIntegrante(string id);

    }

}