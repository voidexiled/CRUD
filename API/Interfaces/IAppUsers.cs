
using API.Entities;
namespace API.Interfaces
{
    public interface IAppUsers
    {
        Task<IEnumerable<AppUser>> GetAllUsers();
        Task<AppUser> GetUserById(int id);
        Task<bool> CreateUser(AppUser user);
        Task<bool> UpdateUser(AppUser user);
        Task<bool> DeleteUser(int id);

    }
}