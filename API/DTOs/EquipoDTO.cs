
using API.Entities;
using API.Interfaces;
using MySql.Data.MySqlClient;
using Dapper;
namespace API.DTOs
{
    public class EquipoDTO : IEquipos
    {
        private MySqlConfiguration _connectionString;

        protected MySqlConnection dbConnection()
        {
            return new MySqlConnection(_connectionString.ConnectionString);
        }
        public EquipoDTO(MySqlConfiguration connectionString)
        {
            _connectionString = connectionString;
        }
        public async Task<IEnumerable<Equipo>> GetAllEquipos()
        {
            var db = dbConnection();
            var sql = @"CALL get_equipos";
            return await db.QueryAsync<Equipo>(sql, new { });
        }

        public async Task<Equipo> GetEquipoById(int id)
        {
            var db = dbConnection();
            var sql = @"CALL get_equipo_by_id(@id)";
            return await db.QueryFirstOrDefaultAsync<Equipo>(sql, new { id });
        }

        public Task<Equipo> CreateEquipo(Equipo equipo)
        {
            throw new NotImplementedException();
        }

        public Task<Equipo> UpdateEquipo(Equipo equipo)
        {
            throw new NotImplementedException();
        }

        public Task<Equipo> DeleteEquipo(int id)
        {
            throw new NotImplementedException();
        }
    }
}