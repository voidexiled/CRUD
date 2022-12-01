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
    public class IntegranteDTO : IIntegrante
    {
        private MySqlConfiguration _connectionString;

        public Task<Integrante> CreateIntegrante(Integrante integrante)
        {
            throw new NotImplementedException();
        }

        public Task<Integrante> DeleteIntegrante(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Integrante>> GetAllIntegrantes()
        {
            throw new NotImplementedException();
        }

        public Task<Integrante> GetIntegranteById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Integrante>> GetIntegrantesByEquipo(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Integrante> UpdateIntegrante(Integrante integrante)
        {
            throw new NotImplementedException();
        }

        protected MySqlConnection dbConnection()
        {
            return new MySqlConnection(_connectionString.ConnectionString);
        }
    }
}