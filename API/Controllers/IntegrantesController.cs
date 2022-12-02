using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class IntegrantesController : BaseApiController
    {
        private readonly IIntegrantes _integrantes;

        public IntegrantesController(IIntegrantes integrantes)
        {
            _integrantes = integrantes;
        }

        [HttpGet("/equipo/{id}/count")]
        public async Task<ActionResult> CountIntegrantesByEquipo(int id)
        {
            return Ok(await _integrantes.CountIntegrantesByEquipo(id));
        }

        [HttpGet]
        public async Task<ActionResult> GetIntegrantes()
        {
            return Ok(await _integrantes.GetAllIntegrantes());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetIntegranteById(string id)
        {
            return Ok(await _integrantes.GetIntegranteById(id));
        }

        [HttpGet("equipo/{id}")]
        public async Task<ActionResult> GetIntegrantesByEquipo(int id)
        {
            return Ok(await _integrantes.GetIntegrantesByEquipo(id));
        }


        [HttpPost]
        public async Task<ActionResult> CreateIntegrante([FromBody] Integrante integrante)
        {
            if (integrante == null)
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var res = await _integrantes.CreateIntegrante(integrante);
            if (res)
            {
                return Ok("Integrante creado");
            }
            return BadRequest("No se pudo crear el integrante");
        }

        [HttpPut]
        public async Task<ActionResult> UpdateIntegrante([FromBody] Integrante integrante)
        {
            if (integrante == null)
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var res = await _integrantes.UpdateIntegrante(integrante);
            if (res)
            {
                return Ok("Integrante actualizado");
            }
            return BadRequest("No se pudo actualizar el integrante");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteIntegrante(string id)
        {
            var res = await _integrantes.DeleteIntegrante(id);
            if (res)
            {
                return Ok("Integrante eliminado");
            }
            return BadRequest("No se pudo eliminar el integrante");
        }
    }
}