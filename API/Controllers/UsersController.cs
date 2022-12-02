using Microsoft.AspNetCore.Mvc;
using API.Interfaces;
using API.Entities;

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

        [HttpPost]
        public async Task<ActionResult> CreateUser([FromBody] AppUser user)
        {
            if (user == null)
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var res = await _users.CreateUser(user);
            if (res)
            {
                return Ok("User created");
            }
            return BadRequest("Could not create user");
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser([FromBody] AppUser user)
        {
            if (user == null)
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var res = await _users.UpdateUser(user);
            if (res)
            {
                return Ok("User updated");
            }
            return BadRequest("Could not update user");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            var res = await _users.DeleteUser(id);
            if (res)
            {
                return Ok("User deleted");
            }
            return BadRequest("Could not delete user");
        }
    }
}