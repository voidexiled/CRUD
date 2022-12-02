using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Interfaces;
using API.DTOs;
using API.Entities;

namespace API.Controllers
{

    public class EquiposController : BaseApiController
    {
        private readonly IEquipos _equipos;

        public EquiposController(IEquipos equipos)
        {
            _equipos = equipos;
        }

        [HttpGet]
        public async Task<ActionResult> GetEquipos()
        {
            return Ok(await _equipos.GetAllEquipos());
        }

        [HttpGet("nombre/{nombre}")]
        public async Task<ActionResult> GetEquipoByName(string nombre)
        {
            return Ok(await _equipos.GetEquipoByName(nombre));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetEquipoById(int id)
        {
            return Ok(await _equipos.GetEquipoById(id));
        }

        [HttpGet("categoria/{cat_id}")]
        public async Task<ActionResult> GetEquiposByCategory(int cat_id)
        {
            return Ok(await _equipos.GetEquiposByCategory(cat_id));
        }
        [HttpPost]
        public async Task<ActionResult> CreateEquipo([FromBody] Equipo equipo)
        {
            if (equipo == null)
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var res = await _equipos.CreateEquipo(equipo);
            if (res)
            {
                return Ok("Equipo creado");
            }
            return BadRequest("No se pudo crear el equipo");
        }

        [HttpPut]
        public async Task<ActionResult> UpdateEquipo([FromBody] Equipo equipo)
        {
            if (equipo == null)
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var res = await _equipos.UpdateEquipo(equipo);
            if (res)
            {
                return Ok("Equipo actualizado");
            }
            return BadRequest("No se pudo actualizar el equipo");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEquipo(int id)
        {
            var res = await _equipos.DeleteEquipo(id);
            if (res)
            {
                return Ok("Equipo eliminado");
            }
            return BadRequest("No se pudo eliminar el equipo");
        }
    }
}