using Microsoft.AspNetCore.Mvc;
using API.Interfaces;
namespace API.Controllers
{

    public class UsersController : BaseApiController
    {
        private readonly IAppUsers _users;

        public UsersController(IAppUsers users)
        {
            _users = users;
        }

        [HttpGet]
        public async Task<ActionResult> GetUsers()
        {
            return Ok(await _users.GetAllUsers());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetUserById(int id)
        {
            return Ok(await _users.GetUserById(id));
        }
    }
}