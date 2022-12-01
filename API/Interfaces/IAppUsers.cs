
using API.Entities;
namespace API.Interfaces
{
    public interface IAppUsers
    {
        Task<IEnumerable<AppUser>> GetAllUsers();
    }
}