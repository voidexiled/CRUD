using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class EventosController : BaseApiController
    {
        private readonly IEventos _eventos;

        public EventosController(IEventos eventos)
        {
            _eventos = eventos;
        }

        [HttpGet]
        public async Task<ActionResult> GetEventos()
        {
            return Ok(await _eventos.GetAllEventos());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetEventoById(int id)
        {
            return Ok(await _eventos.GetEventoById(id));
        }

        [HttpGet("nombre/{nombre}")]
        public async Task<ActionResult> GetEventoByName(string nombre)
        {
            return Ok(await _eventos.GetEventoByName(nombre));
        }

        [HttpPost]
        public async Task<ActionResult> CreateEvento([FromBody] Evento evento)
        {
            if (evento == null)
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var res = await _eventos.CreateEvento(evento);
            if (res)
            {
                return Ok();
            }
            return BadRequest("No se pudo crear el evento");
        }
        [HttpPut]
        public async Task<ActionResult> UpdateEvento([FromBody] Evento evento)
        {
            if (evento == null)
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var res = await _eventos.UpdateEvento(evento);
            if (res)
            {
                return Ok();
            }
            return BadRequest("No se pudo actualizar el evento");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEvento(int id)
        {
            var res = await _eventos.DeleteEvento(id);
            if (res)
            {
                return Ok();
            }
            return BadRequest("No se pudo eliminar el evento");
        }


    }


}