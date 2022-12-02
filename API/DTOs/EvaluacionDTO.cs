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
    public class EvaluacionDTO : IEvaluaciones
    {
        private MySqlConfiguration _connectionString;
        protected MySqlConnection dbConnection()
        {
            return new MySqlConnection(_connectionString.ConnectionString);
        }
        public EvaluacionDTO(MySqlConfiguration connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<bool> CreateEvaluacion(Evaluacion evaluacion)
        {
            var db = dbConnection();
            var sql = @"CALL create_evaluacion(@proyecto, @jurado, @evento)";
            var result = await db.ExecuteAsync(sql, new { evaluacion.proyecto, evaluacion.jurado, evaluacion.evento });
            return result > 0;
        }

        public async Task<bool> DeleteEvaluacion(int id)
        {
            var db = dbConnection();
            var sql = @"CALL delete_evaluacion(@id)";
            var result = await db.ExecuteAsync(sql, new { id });
            return result > 0;
        }

        public Task<IEnumerable<IEvaluaciones>> GetAllEvaluaciones()
        {
            throw new NotImplementedException();
        }

        public async Task<IEvaluaciones> GetEvaluacionByProyecto(int id)
        {
            var db = dbConnection();
            var sql = @"CALL get_evaluacion_by_proyecto(@id)";
            return await db.QueryFirstOrDefaultAsync<IEvaluaciones>(sql, new { id });
        }

        public Task<IEvaluaciones> GetEvaluacionById(int id)
        {
            var db = dbConnection();
            var sql = @"CALL get_evaluacion_by_id(@id)";
            return db.QueryFirstOrDefaultAsync<IEvaluaciones>(sql, new { id });
        }

        public async Task<IEnumerable<IEvaluaciones>> GetEvaluacionesByJurado(string id)
        {
            var db = dbConnection();
            var sql = @"CALL get_evaluaciones_by_jurado(@id)";
            return await db.QueryAsync<IEvaluaciones>(sql, new { id });
        }

        public async Task<bool> UpdateEvaluacion(Evaluacion evaluacion)
        {
            var db = dbConnection();
            var sql = @"CALL update_evaluacion(@id, @proyecto, @jurado, @evento)";
            var result = await db.ExecuteAsync(sql, new { evaluacion.id_evaluacion, evaluacion.proyecto, evaluacion.jurado, evaluacion.evento });
            return result > 0;
        }


    }
}