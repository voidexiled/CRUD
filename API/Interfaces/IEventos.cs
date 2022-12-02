using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IEventos
    {
        Task<IEnumerable<Evento>> GetAllEventos();
        Task<Evento> GetEventoByName(string name);
        Task<Evento> GetEventoById(int id);

        Task<bool> CreateEvento(Evento evento);
        Task<bool> UpdateEvento(Evento evento);
        Task<bool> DeleteEvento(int id);



    }
}