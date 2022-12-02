using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Dapper;
using MySql.Data.MySqlClient;

namespace API.DTOs
{
    public class JuradoDTO : IJurados
    {
        private MySqlConfiguration _connectionString;

        protected MySqlConnection dbConnection()
        {
            return new MySqlConnection(_connectionString.ConnectionString);
        }

        public JuradoDTO(MySqlConfiguration connectionString)
        {
            _connectionString = connectionString;
        }
        public async Task<bool> CreateJurado(Jurado jurado)
        {
            var db = dbConnection();
            var sql = @"CALL create_jurado(@curp, @nombre, @apellido1, @apellido2, @contrasena)";
            var result = await db.ExecuteAsync(sql, new { jurado.curp, jurado.nombre, jurado.apellido1, jurado.apellido2, jurado.contrasena });
            return result > 0;
        }

        public async Task<bool> DeleteJurado(string curp)
        {
            var db = dbConnection();
            var sql = @"CALL delete_jurado(@curp)";
            var result = await db.ExecuteAsync(sql, new { curp });
            return result > 0;
        }

        public async Task<IEnumerable<Jurado>> GetAllJurados()
        {
            var db = dbConnection();
            var sql = @"CALL get_jurados";
            return await db.QueryAsync<Jurado>(sql, new { });
        }

        public async Task<Jurado> GetJuradoByCurp(string id)
        {
            var db = dbConnection();
            var sql = @"CALL get_jurado_by_curp(@id)";
            return await db.QueryFirstOrDefaultAsync<Jurado>(sql, new { id });
        }

        public async Task<bool> UpdateJurado(Jurado jurado)
        {
            var db = dbConnection();
            var sql = @"CALL update_jurado(@curp, @nombre, @apellido1, @apellido2)";
            var result = await db.ExecuteAsync(sql, new { jurado.curp, jurado.nombre, jurado.apellido1, jurado.apellido2 });
            return result > 0;
        }
    }
}