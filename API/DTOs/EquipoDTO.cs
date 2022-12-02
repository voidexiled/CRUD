
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

        public async Task<bool> CreateEquipo(Equipo equipo)
        {
            var _nombre = equipo.nombre;
            var _institucion = equipo.institucion;
            var _evento = equipo.evento;
            var _categoria = equipo.categoria;
            var db = dbConnection();
            var sql = @"CALL create_equipo(@_nombre, @_institucion, @_evento, @_categoria)";
            var result = await db.ExecuteAsync(sql, new { _nombre, _institucion, _evento, _categoria });
            return result > 0;
        }

        public async Task<bool> UpdateEquipo(Equipo equipo)
        {
            var _id = equipo.id_equipo;
            var _nombre = equipo.nombre;
            var _institucion = equipo.institucion;
            var _evento = equipo.evento;
            var _categoria = equipo.categoria;
            var db = dbConnection();
            var sql = @"CALL update_equipo(@_id, @_nombre, @_institucion, @_evento, @_categoria)";
            var result = await db.ExecuteAsync(sql, new { _id, _nombre, _institucion, _evento, _categoria });
            return result > 0;
        }

        public async Task<bool> DeleteEquipo(int id)
        {
            var db = dbConnection();
            var sql = @"CALL delete_equipo(@id)";
            var result = await db.ExecuteAsync(sql, new { id });
            return result > 0;
        }

        public async Task<IEnumerable<Equipo>> GetEquiposByCategory(int categoria)
        {
            var db = dbConnection();
            var sql = @"CALL get_equipo_by_cat(@categoria)";
            return await db.QueryAsync<Equipo>(sql, new { categoria });
        }

        public async Task<Equipo> GetEquipoByName(string nombre)
        {
            var db = dbConnection();
            var sql = @"CALL get_equipo_by_name(@nombre)";
            return await db.QueryFirstOrDefaultAsync<Equipo>(sql, new { nombre });
        }
    }
}