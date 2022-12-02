using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using Dapper;
using API.Entities;
using API.Interfaces;

namespace API.DTOs
{
    public class EventoDTO : IEventos
    {

        private MySqlConfiguration _connectionString;

        protected MySqlConnection dbConnection()
        {
            return new MySqlConnection(_connectionString.ConnectionString);
        }

        public EventoDTO(MySqlConfiguration connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<IEnumerable<Evento>> GetAllEventos()
        {
            var db = dbConnection();
            var sql = @"CALL get_eventos";
            return await db.QueryAsync<Evento>(sql, new { });
        }

        public async Task<Evento> GetEventoByName(string nombre)
        {
            var db = dbConnection();
            var sql = @"CALL get_evento_by_name(@nombre)";
            return await db.QueryFirstOrDefaultAsync<Evento>(sql, new { nombre });
        }

        public async Task<Evento> GetEventoById(int id)
        {
            var db = dbConnection();
            var sql = @"CALL get_evento_by_id(@id)";
            return await db.QueryFirstOrDefaultAsync<Evento>(sql, new { id });
        }

        public async Task<bool> CreateEvento(Evento evento)
        {
            var db = dbConnection();
            var sql = @"CALL create_evento(@sede, @fecha, @nombre)";
            var result = await db.ExecuteAsync(sql, new { evento.sede, evento.fecha, evento.nombre });
            return result > 0;
        }

        public async Task<bool> UpdateEvento(Evento evento)
        {
            var db = dbConnection();
            var sql = @"CALL update_evento(@id, @sede, @fecha, @nombre)";
            var result = await db.ExecuteAsync(sql, new { evento.id_evento, evento.sede, evento.fecha, evento.nombre });
            return result > 0;
        }

        public async Task<bool> DeleteEvento(int id)
        {
            var db = dbConnection();
            var sql = @"CALL delete_evento(@id)";
            var result = await db.ExecuteAsync(sql, new { id });
            return result > 0;
        }



    }
}