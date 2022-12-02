using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IEvaluaciones
    {
        Task<IEnumerable<IEvaluaciones>> GetAllEvaluaciones();
        Task<IEnumerable<IEvaluaciones>> GetEvaluacionesByJurado(string id);
        Task<IEvaluaciones> GetEvaluacionById(int id);
        Task<IEvaluaciones> GetEvaluacionByProyecto(int id);

        Task<bool> CreateEvaluacion(Evaluacion evaluacion);
        Task<bool> UpdateEvaluacion(Evaluacion evaluacion);
        Task<bool> DeleteEvaluacion(int id);
    }
}