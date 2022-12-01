
using API.Entities;
using API.Interfaces;
using Dapper;
using MySql.Data.MySqlClient;
namespace API.DTOs
{
    public class AppUserDTO : IAppUsers
    {
        private MySqlConfiguration _connectionString;
        public AppUserDTO(MySqlConfiguration connectionString)
        {
            _connectionString = connectionString;
        }
        protected MySqlConnection dbConnection()
        {
            return new MySqlConnection(_connectionString.ConnectionString);
        }

        public async Task<IEnumerable<AppUser>> GetAllUsers()
        {
            var db = dbConnection();
            //var sql = @"SELECT * FROM usuarios";
            //return await db.QueryAsync<AppUser>(sql, new { });
            return await db.QueryAsync<AppUser>("CALL get_users", new { });
        }
        public async Task<AppUser> GetUserById(int id)
        {
            var db = dbConnection();
            //var sql = @"SELECT * FROM usuarios WHERE id = @id";
            var sql = @"CALL get_user(@id)";
            return await db.QueryFirstOrDefaultAsync<AppUser>(sql, new { id });
        }

        public Task<AppUser> CreateUser(AppUser user)
        {
            throw new NotImplementedException();
        }

        public Task<AppUser> UpdateUser(AppUser user)
        {
            throw new NotImplementedException();
        }

        public Task<AppUser> DeleteUser(int id)
        {
            throw new NotImplementedException();
        }
    }
}