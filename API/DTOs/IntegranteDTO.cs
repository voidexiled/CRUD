using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using Dapper;
using API.Interfaces;
using API.Entities;

namespace API.DTOs
{
    public class IntegranteDTO : IIntegrantes
    {
        private MySqlConfiguration _connectionString;

        protected MySqlConnection dbConnection()
        {
            return new MySqlConnection(_connectionString.ConnectionString);
        }
        public IntegranteDTO(MySqlConfiguration connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<bool> CreateIntegrante(Integrante integrante)
        {
            var db = dbConnection();
            var sql = @"CALL create_integrante(@curp, @nombre, @apellido1, @apellido2, @edad, @equipo)";
            var result = await db.ExecuteAsync(sql, new { integrante.curp, integrante.nombre, integrante.apellido1, integrante.apellido2, integrante.edad, integrante.equipo });
            return result > 0;
        }

        public async Task<bool> DeleteIntegrante(string id)
        {
            var db = dbConnection();
            var sql = @"CALL delete_integrante(@id)";
            var result = await db.ExecuteAsync(sql, new { id });
            return result > 0;
        }

        public async Task<IEnumerable<Integrante>> GetAllIntegrantes()
        {
            var db = dbConnection();
            var sql = @"CALL get_integrantes";
            return await db.QueryAsync<Integrante>(sql, new { });
        }

        public async Task<Integrante> GetIntegranteById(string id)
        {
            var db = dbConnection();
            var sql = @"CALL get_integrante_by_id(@id)";
            return await db.QueryFirstOrDefaultAsync<Integrante>(sql, new { id });
        }

        public async Task<IEnumerable<Integrante>> GetIntegrantesByEquipo(int id)
        {
            var db = dbConnection();
            var sql = @"CALL get_integrantes_by_equipo(@id)";
            return await db.QueryAsync<Integrante>(sql, new { id });
        }

        public async Task<bool> UpdateIntegrante(Integrante integrante)
        {
            var _curp = integrante.curp;
            var _nombre = integrante.nombre;
            var _apellido1 = integrante.apellido1;
            var _apellido2 = integrante.apellido2;
            var _edad = integrante.edad;
            var db = dbConnection();
            var sql = @"CALL update_integrante(@_curp, @_nombre, @_apellido1, @_apellido2, @_edad)";
            var result = await db.ExecuteAsync(sql, new { _curp, _nombre, _apellido1, _apellido2, _edad });
            return result > 0;
        }

        public Task<int> CountIntegrantesByEquipo(int eq_id)
        {
            var db = dbConnection();
            var sql = @"CALL get_integrantes_by_equipo_count(@eq_id)";
            return db.QueryFirstOrDefaultAsync<int>(sql, new { eq_id });
        }
    }
}