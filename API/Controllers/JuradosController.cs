using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class JuradosController : BaseApiController
    {
        private readonly IJurados _jurados;

        public JuradosController(IJurados jurados)
        {
            _jurados = jurados;
        }

        [HttpGet]
        public async Task<ActionResult> GetJurados()
        {
            return Ok(await _jurados.GetAllJurados());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetJuradoByCurp(string id)
        {
            return Ok(await _jurados.GetJuradoByCurp(id));
        }

        [HttpPost]
        public async Task<ActionResult> CreateJurado([FromBody] Jurado jurado)
        {
            if (jurado == null)
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var res = await _jurados.CreateJurado(jurado);
            if (res)
            {
                return Ok("Jurado creado");
            }
            return BadRequest("No se pudo crear el jurado");
        }

        [HttpPut]
        public async Task<ActionResult> UpdateJurado([FromBody] Jurado jurado)
        {
            if (jurado == null)
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var res = await _jurados.UpdateJurado(jurado);
            if (res)
            {
                return Ok("Jurado actualizado");
            }
            return BadRequest("No se pudo actualizar el jurado");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteJurado(string id)
        {
            if (id == null)
            {
                return BadRequest();
            }
            var res = await _jurados.DeleteJurado(id);
            if (res)
            {
                return Ok("Jurado eliminado");
            }
            return BadRequest("No se pudo eliminar el jurado");
        }





    }
}