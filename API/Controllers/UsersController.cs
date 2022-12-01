using Microsoft.AspNetCore.Mvc;
using API.Interfaces;
namespace API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
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
    }
}