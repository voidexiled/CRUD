using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class EvaluacionesController : BaseApiController
    {
        private readonly IEvaluaciones _evaluaciones;

        public EvaluacionesController(IEvaluaciones evaluaciones)
        {
            _evaluaciones = evaluaciones;
        }

        [HttpGet]
        public async Task<ActionResult> GetEvaluaciones()
        {
            return Ok(await _evaluaciones.GetAllEvaluaciones());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetEvaluacionById(int id)
        {
            return Ok(await _evaluaciones.GetEvaluacionById(id));
        }

        [HttpGet("jurado/{id}")]
        public async Task<ActionResult> GetEvaluacionesByJurado(string id)
        {
            return Ok(await _evaluaciones.GetEvaluacionesByJurado(id));
        }

        [HttpGet("proyecto/{id}")]
        public async Task<ActionResult> GetEvaluacionByProyecto(int id)
        {
            return Ok(await _evaluaciones.GetEvaluacionByProyecto(id));
        }


        [HttpPost]
        public async Task<ActionResult> CreateEvaluacion([FromBody] Evaluacion evaluacion)
        {
            if (evaluacion == null)
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var res = await _evaluaciones.CreateEvaluacion(evaluacion);
            if (res)
            {
                return Ok("Evaluacion creada");
            }
            return BadRequest("No se pudo crear la evaluacion");
        }

        [HttpPut]
        public async Task<ActionResult> UpdateEvaluacion([FromBody] Evaluacion evaluacion)
        {
            if (evaluacion == null)
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var res = await _evaluaciones.UpdateEvaluacion(evaluacion);
            if (res)
            {
                return Ok("Evaluacion actualizada");
            }
            return BadRequest("No se pudo actualizar la evaluacion");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEvaluacion(int id)
        {
            var res = await _evaluaciones.DeleteEvaluacion(id);
            if (res)
            {
                return Ok("Evaluacion eliminada");
            }
            return BadRequest("No se pudo eliminar la evaluacion");
        }



    }
}