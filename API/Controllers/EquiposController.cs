using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Interfaces;
using API.DTOs;
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

        [HttpGet("{id}")]
        public async Task<ActionResult> GetEquipoById(int id)
        {
            return Ok(await _equipos.GetEquipoById(id));
        }

    }
}