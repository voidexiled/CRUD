
using API.Entities;
namespace API.Interfaces
{
    public interface IAppUsers
    {
        Task<IEnumerable<AppUser>> GetAllUsers();
        Task<AppUser> GetUserById(int id);
        Task<AppUser> CreateUser(AppUser user);
        Task<AppUser> UpdateUser(AppUser user);
        Task<AppUser> DeleteUser(int id);

    }
}