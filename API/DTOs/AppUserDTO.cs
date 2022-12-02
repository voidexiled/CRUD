
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

        public async Task<bool> CreateUser(AppUser user)
        {
            var _usuario = user.usuario;
            var _password = user.contrasena;
            var _rol = user.rol;
            var db = dbConnection();
            //var sql = @"INSERT INTO usuarios (nombre, apellido, email, password, rol) VALUES (@_nombre, @_apellido, @_email, @_password, @_rol)";
            var sql = @"CALL create_user(@_usuario, @_password, @_rol)";
            var result = await db.ExecuteAsync(sql, new { _usuario, _password, _rol });
            return result > 0;
        }

        public async Task<bool> UpdateUser(AppUser user)
        {
            var _id = user.id;
            var _usuario = user.usuario;
            var _password = user.contrasena;
            var _rol = user.rol;
            var db = dbConnection();
            //var sql = @"UPDATE usuarios SET nombre = @_nombre, apellido = @_apellido, email = @_email, password = @_password, rol = @_rol WHERE id = @_id";
            var sql = @"CALL update_user(@_id, @_usuario, @_password, @_rol)";
            var result = await db.ExecuteAsync(sql, new { _id, _usuario, _password, _rol });
            return result > 0;
        }

        public async Task<bool> DeleteUser(int id)
        {
            var db = dbConnection();
            //var sql = @"DELETE FROM usuarios WHERE id = @id";
            var sql = @"CALL delete_user(@id)";
            var result = await db.ExecuteAsync(sql, new { id });
            return result > 0;
        }
    }
}